import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Card from './Card';
import Form from './Form';
import UpdateForm from './UpdateForm';
import SignUpForm from './SignUpForm';


function App() {


  return (
  <>
  <BrowserRouter>
      <Routes>
          <Route path='/' element = {<Card/>} >All Cartoons</Route>
          <Route path='/cartoon' element = {<Form/>}>Add New Cartoon</Route>
          <Route path='/cartoon/:id' element={<UpdateForm />} />
          <Route path='/signUp' element={<SignUpForm/>}/>
      </Routes>
  </BrowserRouter>
  </>
  );
}

export default App


  

  


  
    


    
  

