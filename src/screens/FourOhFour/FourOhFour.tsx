import { Link } from 'react-router-dom';

export default function FourOhFour() {
  return (
    <div>
      <h1>Oops</h1>
      <p>
        We could not find the resource that you requested, why not go <Link to="/">home</Link>{' '}
        and try again?
      </p>
    </div>
  );
}
