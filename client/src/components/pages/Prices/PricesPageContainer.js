import { connect } from 'react-redux';
import { getConcerts, loadConcerts, loadConcertsRequest } from '../../../redux/concertsRedux';
import PricePage from './PricesPage';

const mapStateToProps = state => ({
  concerts: getConcerts(state),
});

const mapDispatchToProps = dispatch => ({
  loadConcertsReq: () => dispatch(loadConcertsRequest()),
  loadConcertsData: (concerts) => dispatch(loadConcerts(concerts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PricePage);