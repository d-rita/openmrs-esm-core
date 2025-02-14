import React, { useMemo, useState } from "react";
import { Button, ContentSwitcher, Switch } from "@carbon/react";
import { Close } from "@carbon/react/icons";
import { useTranslation } from "react-i18next";
import { Configuration } from "../configuration/configuration.component";
import type { FrontendModule } from "../types";
import { FrontendModules } from "../frontend-modules/frontend-modules.component";
import { BackendDependencies } from "../backend-dependencies/backend-dependencies.component";
import type { ResolvedDependenciesModule } from "../backend-dependencies/openmrs-backend-dependencies";
import styles from "./popup.styles.scss";
import { FeatureFlags } from "../feature-flags/feature-flags.component";

interface DevToolsPopupProps {
  close(): void;
  frontendModules: Array<FrontendModule>;
  backendDependencies: Array<ResolvedDependenciesModule>;
  visibleTabIndex?: number;
}

export default function Popup({
  close,
  frontendModules,
  backendDependencies,
}: DevToolsPopupProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const tabContent = useMemo(() => {
    if (activeTab == 0) {
      return <Configuration />;
    } else if (activeTab == 1) {
      return <FrontendModules frontendModules={frontendModules} />;
    } else if (activeTab == 2) {
      return <BackendDependencies backendDependencies={backendDependencies} />;
    } else {
      return <FeatureFlags />;
    }
  }, [activeTab, backendDependencies, frontendModules]);

  return (
    <div className={styles.popup}>
      <div className={styles.topBar}>
        <div className={styles.tabs}>
          <ContentSwitcher
            onChange={(c) => {
              setActiveTab((c as any).index);
            }}
          >
            <Switch
              name="configuration-tab"
              text={t("configuration", "Configuration")}
            />
            <Switch
              name="frontend-modules-tab"
              text={t("frontendModules", "Frontend Modules")}
            />
            <Switch
              name="backend-modules-tab"
              text={t("backendModules", "Backend Modules")}
            />
            <Switch
              name="feature-flags-tab"
              text={t("featureFlags", "Feature Flags")}
            />
          </ContentSwitcher>
        </div>
        <div>
          <Button
            kind="secondary"
            renderIcon={(props) => <Close size={16} {...props} />}
            iconDescription="Close"
            onClick={close}
            hasIconOnly
            size="sm"
          />
        </div>
      </div>
      <div className={styles.content}>{tabContent}</div>
    </div>
  );
}
