import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AutoLayoutExample() {
  return (
    <section>
        <Container className="banner" id="home">
            <Row className="align-items-center">
                <Col xs={12} md={6} xl={7}>
                    <span className="tagline banner-items">Tagline</span>
                    <h1 className="banner-items">ProfileName Profile: </h1>
                    <p className="banner-items">The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.</p>
                </Col>
                <Col xs={12} md={6} xl={5}>
                    <span className="tagline banner-items">Tagline</span>
                    <h1 className="banner-items">OTHER STUFF</h1>
                    <p className="banner-items">The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.</p>
                </Col>
            </Row>
            <Row className="align-items-center banner-items">
                <Col xs={12} md={4} xl={5}>
                    <span className="tagline banner-items">Tagline</span>
                    <h1  className="banner-items">MORE DETAILS</h1>
                    <p  className="banner-items">The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.</p>
                </Col>
                <Col xs={12} md={4} xl={4}>
                    <span className="tagline banner-items">Tagline</span>
                    <h1  className="banner-items">MORE MORE DETAILS</h1>
                    <p  className="banner-items">The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.</p>
                </Col>
                <Col xs={12} md={4} xl={3}>
                    <span className="tagline banner-items">Tagline</span>
                    <h1  className="banner-items">THIRD DETAILS</h1>
                    <p  className="banner-items">The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.</p>
                </Col>
            </Row>
        </Container>
    </section>
  );
}

export default AutoLayoutExample;