import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { notify, incrementPendingRequests, decrementPendingRequests } from '../../../utils';
import ReactGA from 'react-ga';
import { Row, Col } from "antd";
import ProjectPageLayout, { Content, InnerTopBar } from "../../../components/project-page-layout/ProjectPageLayout";
import Topbar from '../../../components/topbar/Topbar';
import Sidenav from '../../../components/sidenav/Sidenav';
import ApplyLicenseForm from "../../../components/settings/apply-license/ApplyLicenseForm";
import { getEnv, applyClusterLicense } from '../../../operations/cluster';

const ApplyLicense = () => {
  const history = useHistory()

  useEffect(() => {
    ReactGA.pageview("/projects/settings/apply-license");
  }, []);

  // Global state
  const { clusterName } = useSelector(state => getEnv(state))

  const handleApplyLicense = (clusterName, licenseKey, licenseValue) => {
    incrementPendingRequests()
    applyClusterLicense(clusterName, licenseKey, licenseValue)
      .then(() => {
        notify("success", "Success", "Applied license key to cluster successfully")
        history.goBack()
      })
      .catch((ex) => notify("error", "Error applying license key to cluster", ex))
      .finally(() => decrementPendingRequests())
  }

  return (
    <React.Fragment>
      <Topbar showProjectSelector />
      <Sidenav selectedItem='settings' />
      <ProjectPageLayout>
        <InnerTopBar title="Apply license key" />
        <Content>
          <Row>
            <Col lg={{ span: 12, offset: 6 }}>
              <ApplyLicenseForm clusterName={clusterName} handleSubmit={handleApplyLicense} />
            </Col>
          </Row>
        </Content>
      </ProjectPageLayout>
    </React.Fragment>
  );
};

export default ApplyLicense;