import React from 'react';
import axios from 'axios';
import UserCard from './components/UserCard/UserCard';
import { Container, Row, Col, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      page: 1,
      urlEnd: 'results=20&seed=abc'
    }
  }


  //----  componentDidMount do a first call to API once rendered ----// 

  componentDidMount = async () => {

    let url = 'https://randomuser.me/api/?page=0&results=20&seed=abc';
    const response = await axios.get(url)
    const cleanArray = response.data.results

    // ----- arriving objects are filtered based on their postal code ----/
    const filteredUsers = cleanArray.filter(function (item) {
      // ----- postal code converted to string in order to split it and ignore the letters ----/
      const postalcode = item.location.postcode
      const postalcodeString = postalcode.toString().replace(/[^\d-]/g, '')
      const splitedArray = postalcodeString.split('')
      let primeNumberCounter = 0

      // ----- function that count the prime numbers ----/
      splitedArray.forEach(
        (item) => {

          let myNumber = parseInt(item)
          let isPrime = true // transform string to integers

          for (var j = 2; j < myNumber; j++) {
            console.log('the value of j is ' + j);
            if (myNumber % j === 0) {
              isPrime = false
              console.log("We now know", myNumber, "isn't a prime.");
              break; // no need to test more numbers if we already know it isn't a prime
            }
          }
          if (isPrime) {
            console.log("We now know", myNumber, "isprime.");
            primeNumberCounter++ // we add the prime number found to the counter
          }
        }
      )

      if (primeNumberCounter >= 2) { return true }// we only select the item is it has 2 in its prime number counter
      else { return false }

    }
    )
    var user10 = filteredUsers.slice(0, 10); // we only take the 10 first users from the filtered array with good postal code
    this.setState({ users: user10 })

  }


  fetchGender = async (event) => {

    // ----- condition that check if there is no gender, male or female ----/
    if (event === 'male') {
      this.setState({ urlEnd: 'results=20&gender=male', isGender: true })
   
    } if (event === 'female' ) {
      this.setState({ urlEnd: 'results=20&gender=female', isGender: true })
   
    } 

    //----  API call ----// 

    let url = `https://randomuser.me/api/?page=5&results=10&gender=${event}`;
    const response = await axios.get(url)
    const cleanArray = response.data.results
    this.setState({ users: cleanArray })

    // ----- arriving objects are filtered based on their postal code ----/
    const filteredUsers = cleanArray.filter(function (item) {
      // ----- postal code converted to string in order to split it and ignore the letters ----/
      const postalcode = item.location.postcode
      const postalcodeString = postalcode.toString().replace(/[^\d-]/g, '')
      const splitedArray = postalcodeString.split('')
      let primeNumberCounter = 0

      // ----- function that count the prime numbers ----/

      splitedArray.forEach(
        (item) => {

          let myNumber = parseInt(item)  // transform string to integers

          let isPrime = true
          for (var j = 2; j < myNumber; j++) {
            console.log('the value of j is ' + j);
            if (myNumber % j === 0) {
              isPrime = false
              console.log("We now know", myNumber, "isn't a prime.");
              break; // no need to test more numbers if we already know it isn't a prime
            }
          }
          if (isPrime) {
            console.log("We now know", myNumber, "isprime.");
            primeNumberCounter++
          }
        }
      )

      if (primeNumberCounter >= 2) { return true } // we only select the item is it has 2 in its prime number counter
      else { return false }

    }
    )
    var user10 = filteredUsers.slice(0, 10); // we only take the 10 first users from the filtered array with good postal code
    this.setState({ users: user10 })
  }


  paginationNext = async (event) => {
    let page = this.state.page
    let urlEnd = this.state.urlEnd

    // ----- condition that check if button next or back has been clicked to keep track of pages ----/

    if (event === +1) {
      page++
      this.setState({ page })
    } else if (event === -1 & this.state.page > 1) {
      page--
      this.setState({ page })
    }

    //----  API call ----// 

    let urlFinal = `https://randomuser.me/api/?page=${page}&${urlEnd}`

    const response = await axios.get(urlFinal)
    const cleanArray = response.data.results

    // ----- arriving objects are filtered based on their postal code ----/
    const filteredUsers = cleanArray.filter(function (item) {
      // ----- postal code converted to string in order to split it and ignore the letters ----/
      const postalcode = item.location.postcode
      const postalcodeString = postalcode.toString().replace(/[^\d-]/g, '')
      const splitedArray = postalcodeString.split('')
      let primeNumberCounter = 0


      // ----- function that count the prime numbers ----/

      splitedArray.forEach(
        (item) => {

          let myNumber = parseInt(item) // transform string to integers

          let isPrime = true
          for (var j = 2; j < myNumber; j++) {
            console.log('the value of j is ' + j);
            if (myNumber % j === 0) {
              isPrime = false
              console.log("We now know", myNumber, "isn't a prime.");
              break; // no need to test more numbers if we already know it isn't a prime
            }
          }
          if (isPrime) {
            console.log("We now know", myNumber, "isprime.");
            primeNumberCounter++
          }
        }
      )

      if (primeNumberCounter >= 2) { return true } // we only select the item is it has 2 in its prime number counter
      else { return false }

    }
    )
    var user10 = filteredUsers.slice(0, 10); // we only take the 10 first users from the filtered array with good postal code
    this.setState({ users: user10 })

  }

  // ----- function that set gender in the state and render again----/
  setNoGender = () => {
    this.setState({ urlEnd: 'results=20&seed=abc' })
    this.componentDidMount();
  }

  render() {
    let male = 'male'
    let female = 'female'
    let minus = -1
    let plus = +1

    return (
      //conditional rendering : if the component has not mounted yet, don't display!
      <div className="App">

        {
          this.state.users
            ?
            (<div className="home-container text-center">
              <h1 className=" border border-white text-white p-5"> Welcome to Random User! </h1>
              <p className='text-white font-weight-bold'>page{this.state.page}</p>

              <DropdownButton className=' mb-4 ' id="dropdown-basic-button" variant='secondary' title="Select Gender">
                <Dropdown.Item onClick={() => { this.setNoGender() }}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.fetchGender(male) }}>Male</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.fetchGender(female) }}>Female</Dropdown.Item>
              </DropdownButton>

              <Button className='mb-3' variant="light" onClick={() => { this.paginationNext(minus) }}> next </Button>
              <Button className='mb-3 ml-3' variant="light" onClick={() => { this.paginationNext(plus) }}> next </Button>

              <Container className="card-template">
                <Row>

                  {this.state.users.map(user => (
                    <Col lg={6}>
                      <UserCard
                        {...user}
                      />
                    </Col>

                  ))}

                </Row>
              </Container>

            </div>)
            :
            <p>Egy kis türelem, keresük a infokat... </p>
        }

      </div>
    )
  }
}

export default App;