import './App.css';
import { Route, Switch } from 'react-router'
import Admin from './pages/admin/Admin';
import Home from './pages/home/Home'
import BlogPostContent from './pages/blogPostContent/BlogPostContent';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route 
          path='/admin'
          render={() => 
            <Admin/>
          }
        />
        <Route
          path='/:blogPostId'
          render={({...props}) =>
            <BlogPostContent
              {...props}
            />
          }
        />
        <Route
          path='/'
          render={() =>
            <Home/>
          }
        />
      </Switch>
    </div>
  );
}

export default App;
