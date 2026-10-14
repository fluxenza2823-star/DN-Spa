import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for could not be found." />
      <section className="section">
        <div className="container narrow center">
          <p className="eyebrow">404</p>
          <h1>Page not found</h1>
          <p className="lead">The page you are looking for does not exist or has moved.</p>
          <div className="btn-row btn-row-center">
            <Link to="/" className="btn btn-primary">Back to home</Link>
            <Link to="/contact" className="btn btn-outline">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
