import React, { useReducer } from 'react';
import {Navigate,BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './scenes/Feed/Home';
import { useSelector } from 'react-redux';
import { FollowersWidget,FollowingWidget } from './component';
import LoginPage from './scenes/LoginPage';
import Navbar from './scenes/Navbar';
import PostPage from './scenes/PostPage';
import SearchFeed from './scenes/Feed/SearchFeed';
import { Chat } from './scenes';
import NotificationWidget from './component/Widgets/NotificationWidget';
const App = () => {
  // (!!) is used to convert a value to boolean
  const isAuth = !!useSelector(state=>state.token)
  console.log(isAuth)
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/home' element={isAuth ? (<Home/>):(<Navigate to={'/'}/>)}/>
        <Route path='/post/create' element={<PostPage/>}/>
        <Route path='/followers' element={<FollowersWidget/>}/>
        <Route path='/following' element={<FollowingWidget/>}/>
        <Route path='/user/searchuser/:searchTerm' element={<SearchFeed/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/notification' element={<NotificationWidget/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
