// import logo from './logo.svg';
import './App.css';
import { Routes, Route, Router } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Home } from './components/Home'
import { Profile } from './components/Profile';
import { PostPayload } from './components/PostPayload';
import { Newpost } from './components/Newpost';
import { Newsfeed } from './components/Newsfeed';
import { FakeHome } from './components/FakeHome';
// import { Rough } from './components/Rough';

function App() {
  return (
    <Routes>
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />}>
        <Route path='/home/user/:rollno' element={<Profile />} />
        <Route path='/home' element={<Newsfeed />} />
        <Route path='/home/createpost' element={<Newpost />} />
        <Route path='/home/post/:postid' element={<PostPayload />} />
      </Route>
      <Route exact path='/' element={<FakeHome/>}/>

    </Routes>

  );
}

export default App;
