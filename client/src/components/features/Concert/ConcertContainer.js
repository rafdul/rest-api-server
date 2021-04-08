import { connect } from 'react-redux';
import { getSeats, getRequests, loadSeatsRequest, loadSeats } from '../../../redux/seatsRedux';
// import { getAllConcerts, getRequest, loadConcertsRequest, loadConcerts} from '../../../redux/concertsRedux';
import Concert from './Concert';

const mapStateToProps = state => ({
  seats: getSeats(state),
  requests: getRequests(state),
  // concerts: getAllConcerts(state),
  // requestCon: getRequest(state),
});

const mapDispatchToProps = dispatch => ({
  loadSeats: () => dispatch(loadSeatsRequest()),
  loadSeatsData: (seats) => dispatch(loadSeats(seats)),
  // loadConcerts: () => dispatch(loadConcertsRequest()),
  // loadConcertsData: (seats) => dispatch(loadConcerts(seats)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Concert);