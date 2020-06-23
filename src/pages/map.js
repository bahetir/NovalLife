import React, {useEffect, useState }from "react";
import User from "./user";
import GoogleMapReact from 'google-map-react';


import Iframe from 'react-iframe';
import {  Row, Col, Card} from "antd";
import axios from "axios";
import "../style/help.css";

function Map() {
    const [latest,setLatest] = useState([]);
    const [results, setResults] =useState([]);
    useEffect(() => {
        axios
            .all([
                axios.get("https://disease.sh/v2/all"),
                axios.get("https://disease.sh/v2/countries"),
            ])
            .then((responseArr) => {
                setLatest(responseArr[0].data);
                setResults(responseArr[1].data);

            })
            .catch((err) => {
                console.log(err);
            });

    },[]);

    const date= new Date(parseInt(latest.updated));
    const lastUpdated = date.toString();

    const countries = results.map((data,i)=> {
        return(
            <div>

            </div>
        );
    });


  
    return (
    <div className="container">
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={20} lg={18} xl={16}>
        
        

        
          <div className="map-box">
            <h1>COVID-19 Map Tracker</h1>
            <p>
              This map shows the total number of cases of COVID-19 in the world.
            </p>

            <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card bg = "secondary" title="Cases" bordered={false}>
        {latest.cases}
        </Card>
      </Col>
      <Col span={8}>
        <Card bg = "danger" title="Deaths" bordered={false}>
        {latest.deaths}
        </Card>
      </Col>
      <Col span={8}>
        <Card bg = "success" title="Recovered" bordered={false}>
        {latest.recovered}
        </Card>
      </Col>
    </Row>
  </div>

            <Iframe style="width:100%" width="1150" height="700" src="https://coronavirus.app/map?embed=true" 
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </Iframe>
            <Iframe style="width:100%" width="1150" height="700" src="https://coronavirus.app/analytics?embed=true" 
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </Iframe>
            
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={4} lg={6} xl={7}>
          <User />
        </Col>
      </Row>
    </div>
  );
}

export default Map;
