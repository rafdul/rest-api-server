import React from 'react';
import { Alert, Container } from 'reactstrap';
import io from 'socket.io-client';
import './PricesPage.scss';

class Prices extends React.Component {

  componentDidMount() {
    const { loadConcertsReq, loadConcertsData } = this.props;
    loadConcertsReq();
    this.socket = io.connect((process.env.NODE_ENV === 'production') ? '/' : 'http://localhost:8000');
    this.socket.on('concertsUpdated', concerts => loadConcertsData(concerts));
  }

  parseNum(num) {
    // let result = '';
    if(num === 1) return 'one';
    if(num === 2) return 'two';
    if(num === 3) return 'three';
  }

  render() {
    const {concerts} = this.props;
    console.log('concerts', concerts);
    console.log('concerts length', concerts.length);
    console.log('concerts[0]', concerts[0]);

    return (
      <Container>
        <h1>Prices</h1>
        <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>
        
        <Alert color="info">
            Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
        </Alert>

        {concerts.map(item => (
          <div key={item._id} className="concerts">
            <h2>Day {this.parseNum(item.concert.day)}</h2>
            <p>Price: {item.concert.price}$</p>
            <p className="concerts__workshops">Workshops:
            {item.workshops.map(el => (
              <span key={el._id} className="spanFirst"> "{el.name}"<span className="spanSecond">,</span></span>
            ))}
            </p>
          </div>
        ))}
      </Container>
    );
  }
};

export default Prices;