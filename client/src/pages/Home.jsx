import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className='card'>
      <h2>Home</h2>
      <p className="small">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid eius et provident possimus itaque nisi vitae eligendi tenetur distinctio eos. Sunt eligendi eaque earum maxime!</p>
      <div className="row">
        <Link to='/courses' className="link active">Browse Courses</Link>
        <Link to='/dashboard' className="link active">Go To Dashboard</Link>
      </div>

      <hr />
      <p className="small">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur alias accusamus sequi, ratione sapiente itaque recusandae minus distinctio voluptatibus provident modi quia, neque harum facilis.
      </p>
    </div>
  )
}

export default Home