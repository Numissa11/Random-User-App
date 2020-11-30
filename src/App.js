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
      isGender: false,
      isFemale: false,
      isMale: false,
      urlEnd: 'results=20&seed=abc'
    }
  }

  componentDidMount = async () => {
    let url = 'https://randomuser.me/api/?page=0&results=20&seed=abc';
    const response = await axios.get(url)
    const cleanArray = response.data.results


    console.log('cleanarraysss', cleanArray)

    const filteredUsers = cleanArray.filter(function (item) {

      const postalcode = item.location.postcode
      const postalcodeString = postalcode.toString().replace(/[^\d-]/g, '')
      const splitedArray = postalcodeString.split('')
      let primeNumberCounter = 0

      console.log('postalecode*********************', postalcode)


      splitedArray.forEach(
        (item) => {
          console.log('letter', item)

          let myNumber = parseInt(item)

          console.log('myNumber', myNumber)
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

      console.log('primeNumberCounter', primeNumberCounter)
      if (primeNumberCounter >= 2) { return true }
      else { return false }

    }
    )
    console.log('filteredUsers', filteredUsers)
    var user10 = filteredUsers.slice(0, 10);
    this.setState({ users: user10 })

  }


  fetchGender = async (event) => {
    console.log('event', event)

    if (event == 'male') {
      this.setState({ urlEnd: 'results=20&gender=male' })
      console.log('male page next', this.state.urlEnd)

    } if (event == 'female') {
      this.setState({ urlEnd: 'results=20&gender=female' })

    } else if (this.state.isGender == false) {
      this.setState({ urlEnd: 'results=20&seed=abc' })
      this.paginationNext();
      console.log('fonction else if isGender === false')


    } else {
      console.log('nothing')
    }

    let url = `https://randomuser.me/api/?page=5&results=10&gender=${event}`;
    const response = await axios.get(url)
    const cleanArray = response.data.results

    this.setState({ users: cleanArray, isGender: true })
    console.log('cleanarraysss', cleanArray)

    const filteredUsers = cleanArray.filter(function (item) {

      const postalcode = item.location.postcode
      const postalcodeString = postalcode.toString().replace(/[^\d-]/g, '')
      const splitedArray = postalcodeString.split('')
      let primeNumberCounter = 0

      console.log('postalecode*********************', postalcode)


      splitedArray.forEach(
        (item) => {
          console.log('letter', item)

          let myNumber = parseInt(item)

          console.log('myNumber', myNumber)
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

      console.log('primeNumberCounter', primeNumberCounter)
      if (primeNumberCounter >= 2) { return true }
      else { return false }

    }
    )
    console.log('filteredUsersGender', filteredUsers)
  }



  paginationNext = async () => {
    (console.log('heyyyyyyyyyyyy'))
    //----API call from page 1 to 20 ----// 
    let page = this.state.page
    let urlEnd = this.state.urlEnd
    page++
    this.setState({ page })

    let urlFinal = `https://randomuser.me/api/?page=${page}&${urlEnd}`
    console.log('url END', urlEnd)

    const response = await axios.get(urlFinal)
    const cleanArray = response.data.results


    console.log('cleanarraysss', cleanArray)

    const filteredUsers = cleanArray.filter(function (item) {

      const postalcode = item.location.postcode
      const postalcodeString = postalcode.toString().replace(/[^\d-]/g, '')
      const splitedArray = postalcodeString.split('')
      let primeNumberCounter = 0

      console.log('postalecode*********************', postalcode)


      splitedArray.forEach(
        (item) => {
          console.log('letter', item)

          let myNumber = parseInt(item)

          console.log('myNumber', myNumber)
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

      console.log('primeNumberCounter', primeNumberCounter)
      if (primeNumberCounter >= 2) { return true }
      else { return false }

    }
    )
    console.log('filteredUsers', filteredUsers)
    var user10 = filteredUsers.slice(0, 10);
    this.setState({ users: user10 })

  }

  setNoGender = () => {
    this.componentDidMount();
  }


  render() {
    let male = 'male'
    let female = 'female'

    return (
      <div className="App">

        {
          this.state.users
            ?
            (<div>
              <p>page{this.state.page}</p>

              <DropdownButton id="dropdown-basic-button" title="Select Gender">
                <Dropdown.Item onClick={() => { this.setNoGender() }}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.fetchGender(male) }}>Male</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.fetchGender(female) }}>Female</Dropdown.Item>
              </DropdownButton>
              <Container className="card-template">
                <Row>

                  <Button className='mb-3' variant="light" onClick={() => { this.paginationNext() }}> next </Button>


                  {this.state.users.map(user => (
                    <Col sm={6} lg={4}>
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