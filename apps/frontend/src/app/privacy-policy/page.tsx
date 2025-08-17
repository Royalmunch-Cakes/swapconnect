import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">SwapConnect Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-600">
        Effective Date: 15th July 2025
      </p>
      <p className="mb-6">
        SwapConnect (“we”, “our”, or “us”) is committed to protecting your
        privacy. This Privacy Policy outlines how we collect, use, disclose, and
        safeguard your personal information when you use our platform (web or
        mobile application).
      </p>
      <p className="mb-6">
        By using SwapConnect, you consent to the practices described in this
        policy.
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          1. Information We Collect
        </h2>

        <h3 className="font-medium mt-4">a. Personal Information</h3>
        <ul className="list-disc list-inside text-sm space-y-1 ml-4">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Address (optional for location-based features)</li>
          <li>Profile photo (optional)</li>
          <li>Social media handles (if linked)</li>
        </ul>

        <h3 className="font-medium mt-4">b. Account & Transactional Data</h3>
        <ul className="list-disc list-inside text-sm space-y-1 ml-4">
          <li>Listings you upload</li>
          <li>Swap history and preferences</li>
          <li>Reviews and ratings given/received</li>
          <li>Communication with other users</li>
        </ul>

        <h3 className="font-medium mt-4">c. Device & Usage Data</h3>
        <ul className="list-disc list-inside text-sm space-y-1 ml-4">
          <li>IP address and browser type</li>
          <li>Mobile device information (model, OS)</li>
          <li>Location data (with permission)</li>
          <li>Cookies and usage tracking data</li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside text-sm space-y-1 ml-4">
          <li>Register and manage your SwapConnect account</li>
          <li>Enable secure item listing and swapping</li>
          <li>
            Personalize your experience (e.g., location-based suggestions)
          </li>
          <li>Communicate platform updates, offers, or security alerts</li>
          <li>Detect and prevent fraud, abuse, or violations of our Terms</li>
          <li>Improve our services and platform functionality</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          3. Information Sharing and Disclosure
        </h2>
        <ul className="list-disc list-inside text-sm space-y-1 ml-4">
          <li>
            <strong>With your consent:</strong> For optional features like
            verified social linking or external inspection services.
          </li>
          <li>
            <strong>With service providers:</strong> Who help us with payment
            processing, hosting, analytics, or customer support.
          </li>
          <li>
            <strong>For legal reasons:</strong> To comply with laws,
            regulations, or lawful government requests.
          </li>
          <li>
            <strong>In business transfers:</strong> If we undergo a merger,
            acquisition, or asset sale, your information may be transferred.
          </li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          4. Data Retention and Deletion
        </h2>
        <p className="text-sm">
          We retain your information only as long as necessary to fulfill the
          purposes stated above or as required by law. You can request data
          deletion or deactivation of your account by contacting us at{" "}
          <a
            href="mailto:privacy@swapconnect.app"
            className="text-blue-600 underline"
          >
            privacy@swapconnect.app
          </a>
          .
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          5. Cookies and Tracking Technologies
        </h2>
        <p className="text-sm mb-2">
          SwapConnect uses cookies and similar technologies to:
        </p>
        <ul className="list-disc list-inside text-sm space-y-1 ml-4">
          <li>Keep you signed in</li>
          <li>Analyze platform usage and performance</li>
          <li>Customize content and notifications</li>
        </ul>
        <p className="text-sm mt-2">
          You may choose to disable cookies in your browser settings, though
          this may affect your platform experience.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          6. Your Rights and Choices
        </h2>
        <ul className="list-disc list-inside text-sm space-y-1 ml-4">
          <li>Access, correct, or update your personal information</li>
          <li>Request deletion of your account and associated data</li>
          <li>Opt out of marketing communications at any time</li>
        </ul>
        <p className="text-sm mt-2">
          To exercise any of these rights, email us at{" "}
          <a
            href="mailto:privacy@swapconnect.app"
            className="text-blue-600 underline"
          >
            privacy@swapconnect.app
          </a>
          .
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Data Security</h2>
        <p className="text-sm">
          We implement industry-standard security practices such as:
        </p>
        <ul className="list-disc list-inside text-sm space-y-1 ml-4">
          <li>Secure data transmission (SSL encryption)</li>
          <li>Authentication and session management</li>
          <li>Role-based access control for sensitive operations</li>
        </ul>
        <p className="text-sm mt-2">
          Despite our efforts, no system is completely secure, and we cannot
          guarantee absolute data protection.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8. Children’s Privacy</h2>
        <p className="text-sm">
          SwapConnect is not intended for use by individuals under the age of 18
          without parental consent. We do not knowingly collect data from
          minors.
        </p>
      </section>

      {/* Section 9 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">9. Third-Party Links</h2>
        <p className="text-sm">
          Our platform may contain links to external websites or services. We
          are not responsible for the privacy practices or content of
          third-party platforms.
        </p>
      </section>

      {/* Section 10 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          10. Changes to This Policy
        </h2>
        <p className="text-sm">
          We may update this Privacy Policy periodically. We will notify users
          of significant changes through email or in-app alerts. Continued use
          of the platform after updates constitutes acceptance.
        </p>
      </section>

      {/* Section 11 */}
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">11. Contact Us</h2>
        <p className="text-sm mb-1">
          📧 Email:{" "}
          <a
            href="mailto:support@swapconnect.app"
            className="text-blue-600 underline"
          >
            support@swapconnect.app
          </a>
        </p>
        <p className="text-sm">📍 Address: Lagos, Nigeria</p>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
