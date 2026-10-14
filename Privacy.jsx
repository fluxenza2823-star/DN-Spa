import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import { site } from '../config/site';

export default function Privacy() {
  const contactLine = site.email
    ? `${site.email}, ${site.phone.display}`
    : `${site.phone.display} (email address to be confirmed)`;
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Privacy policy template for Day Night Outcall Massage Spa explaining what information is collected for booking requests."
      />
      <PageHero eyebrow="Legal" title="Privacy Policy">
        Last updated: {site.privacy.lastUpdated}
      </PageHero>

      <section className="section">
        <div className="container narrow prose">
          <p className="notice">
            <strong>Template notice:</strong> This is a basic, editable template. It has not been
            reviewed by a lawyer and does not claim compliance with any specific law. The
            business should review and adapt it before relying on it.
          </p>

          <h2>1. Who we are</h2>
          <p>
            This website is operated by {site.privacy.controllerName}, {site.address.full}.
            Contact: {contactLine}.
          </p>

          <h2>2. Information we collect</h2>
          <p>When you use the home-service request form, you may provide:</p>
          <ul>
            <li>your name and phone number;</li>
            <li>the service you are interested in;</li>
            <li>your preferred date and time;</li>
            <li>the location where you would like the visit.</li>
          </ul>
          <p>Please do not include sensitive health or financial information in your request.</p>

          <h2>3. How the booking form works</h2>
          <p>
            This website does not have a booking database. When you submit the form, your
            browser opens WhatsApp with a message containing the details you entered. The message
            is only sent when you press send in WhatsApp. Information you send through WhatsApp
            is handled under WhatsApp&rsquo;s own terms and privacy policy.
          </p>

          <h2>4. How we use information</h2>
          <p>
            We use the details you send to reply to your enquiry, check availability, confirm
            price and arrange the visit. [Business to confirm any other uses, such as record
            keeping.]
          </p>

          <h2>5. Sharing</h2>
          <p>
            [Business to confirm who may see booking details, for example staff arranging the
            visit.] We do not sell personal information. [Business to verify this statement.]
          </p>

          <h2>6. Retention</h2>
          <p>
            [Business to confirm how long chat messages and booking details are kept.]
          </p>

          <h2>7. Third-party services</h2>
          <p>
            This website may load an embedded Google Map on the Contact page and links to
            WhatsApp and Google Maps. Those services may collect data under their own policies.
            This website does not set advertising or analytics cookies by default. [Update this
            section if you add analytics.]
          </p>

          <h2>8. Your choices</h2>
          <p>
            You may contact us to ask about, correct or delete details you have sent. [Business
            to confirm the process.]
          </p>

          <h2>9. Changes</h2>
          <p>We may update this policy and will change the date above when we do.</p>
        </div>
      </section>
    </>
  );
}
