import React, { useState } from 'react'
import { useParams, useHistory, Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import { dbIcons } from '../../utils'
import { Button, Icon, Select, Menu, Popover, Row, Col, Divider } from 'antd';
import DbSelector from '../../components/db-selector/DbSelector'
import SelectProject from '../../components/select-project/SelectProject'
import './topbar.css'
import store from "../../store"
import { set, get } from "automate-redux"
import githubIcon from "../../assets/githubIcon.svg"
import heartIcon from "../../assets/heartIcon.svg"
import githubOctocat from "../../assets/githubOctocat.svg"
import twitterIcon from "../../assets/twitterIcon.svg"

import logo from '../../assets/logo-black.svg';
import upLogo from '../../logo.png'
import { dbTypes } from '../../constants';

const Topbar = (props) => {
  const history = useHistory()
  const { projectID, selectedDB } = useParams()
  const [modalVisible, setModalVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const projects = useSelector(state => state.projects)
  const selectedProject = projects.find(project => project.id === projectID)
  const projectName = selectedProject ? selectedProject.name : ""
  const handleDBSelect = (dbName) => history.push(`/mission-control/projects/${projectID}/database/${dbName}`)
  
  const svgIcon = dbIcons(projects, projectID, selectedDB)
  const content = (
    <div className="popContent">
      <p style={{marginBottom:"50px", fontWeight:"bold", fontSize:"16px"}}>Love Space Cloud? Help us spread the love!</p>
      <Row align="middle">
        <Col md={{ span:12,  offset:0 }} >
          <a  href="https://github.com/spaceuptech/space-cloud" target="_blank">
            <img src={githubOctocat} />
            <p style={{marginTop:"20px", color:"rgba(0, 0, 0, 0.65)", fontWeight:"600", fontSize:"14px"}}>Star</p>
          </a>
        </Col>
        <Col md={{ span:12, offset:0 }}>
          <a href="https://twitter.com/intent/tweet?text=I%20just%20tried%20%23spacecloud%20and%20it%20is%20amazing&original_referer="
            target="_blank">
            <img src={twitterIcon} />
            <p style={{marginTop:"20px", color:"rgba(0, 0, 0, 0.65)", fontWeight:"600", fontSize:"14px"}}>Tweet</p>
          </a>
        </Col>
      </Row>
    </div>
  );
  return (
    <div>
      <div className="topbar">
        
          <Icon type="menu" className="hamburger" onClick={()=>store.dispatch(set("uiState.showSidenav", true))}/>
          <img className="logo" src={logo} alt="logo" />
          <img className="upLogo" src={upLogo} alt="logo" />
          {props.showProjectSelector && <div className="btn-position">
            <Button className="action-rounded" onClick={() => setModalVisible(true)}>{projectName}
              <Icon type="caret-down" />
            </Button>
          </div>}
          {props.showDbSelector && <div className="db-btn-position">
            <Button className="action-rounded" onClick={() => setVisible(true)}>
              <img src={svgIcon} alt={selectedDB} style={{ marginRight: 10 }} />
              {selectedDB}
              <Icon type="caret-down" />
            </Button>
          </div>}
          
          <DbSelector visible={visible} handleSelect={handleDBSelect} handleCancel={() => setVisible(false)} />

          <SelectProject visible={modalVisible} handleCancel={() => setModalVisible(false)} />
        <div className="right-list">
          <Menu mode="horizontal">
            <Menu.Item>
              <a href="https://docs.spaceuptech.com/" target="_blank">Docs</a>
            </Menu.Item>
            <Menu.Item>
              <a href="https://learn.spaceuptech.com/" target="_blank">Learn</a>
            </Menu.Item>
            <Menu.Item>
              <a href="https://github.com/spaceuptech/space-cloud" target="_blank">
                <img src={githubIcon} />
              </a>
            </Menu.Item>
            <Divider type="vertical" style={{height:"40px"}}/>
            <Menu.Item>
              <Popover content={content} trigger="click" placement="bottom">
                <img src={heartIcon} />
              </Popover>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default Topbar;