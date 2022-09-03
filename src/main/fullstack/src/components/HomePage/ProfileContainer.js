import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Profile from './Profile';
import {useState, useEffect} from "react";
import axios from 'axios';

function AutoLayoutExample(props) {

  const [accountInfo, setAccountInfo] = useState();
  


  return (
    <section>
        <Container className="banner" id="home">
        <Container fluid>
        <Row className='align-items-center'>
            <Col id='icon' >
            <img src={`https://ddragon.leagueoflegends.com/cdn/12.16.1/img/profileicon/${props.data.profileIconId}.png`} alt='pic'></img>
            <span id="level">{props.data.summonerLevel}</span>
            </Col>
            <Col id="test">
            {props.data.name}
            </Col>
        </Row>
        <br />
        <br />
        <Row className='justify-content-start'>
          <Col className='topChamps'>
          <Profile data={[props.data, props.API]} />
          </Col>
        </Row>
    </Container>
        </Container>
    </section>
  );
}

export default AutoLayoutExample;