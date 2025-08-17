import React from "react";

const TermsOfUsePage = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">SwapConnect Disclaimer</h1>
      <p className="mb-4 text-sm text-gray-600">Last Updated: July 15th 2025</p>
      <p className="mb-6">
        This Disclaimer governs your use of the SwapConnect platform (web or
        mobile application) operated by SwapConnect (“we,” “our,” or “us”). By
        accessing or using our platform, you agree to the terms stated in this
        Disclaimer.
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. General Disclaimer</h2>
        <p className="text-sm">
          SwapConnect is a peer-to-peer platform that connects users for the
          purpose of swapping items (starting with mobile phones and expanding
          to other goods). While we provide the tools and infrastructure to
          facilitate listings, communication, and transactions, we do not own,
          inspect, or guarantee any of the items exchanged between users.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          2. No Guarantees or Warranties
        </h2>
        <p className="text-sm mb-2">
          All services and content provided through SwapConnect are offered on
          an “as is” and “as available” basis. We do not make any warranties or
          representations, expressed or implied, regarding:
        </p>
        <ul className="list-disc list-inside text-sm ml-4 space-y-1">
          <li>The accuracy of item listings</li>
          <li>The quality, condition, or authenticity of items</li>
          <li>The reliability or behavior of users</li>
          <li>The successful completion of swaps</li>
        </ul>
        <p className="text-sm mt-2">
          Users are strongly encouraged to carry out their own due diligence,
          inspect items carefully, and use our verification and escrow features
          before completing any transaction.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. User Responsibility</h2>
        <ul className="list-disc list-inside text-sm ml-4 space-y-1">
          <li>
            The content they post (including item descriptions and images)
          </li>
          <li>The honesty and accuracy of their transactions</li>
          <li>Ensuring they have the legal right to swap listed items</li>
          <li>
            Reviewing and understanding other users’ profiles, ratings, and item
            conditions before agreeing to a swap
          </li>
        </ul>
        <p className="text-sm mt-2">
          SwapConnect cannot be held liable for any false claims,
          misrepresentations, damaged goods, or disputes arising from direct
          user interactions.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          4. Escrow and Verification Tools
        </h2>
        <p className="text-sm mb-2">
          To help protect our users, SwapConnect offers optional tools such as:
        </p>
        <ul className="list-disc list-inside text-sm ml-4 space-y-1">
          <li>Item verification by third-party partners</li>
          <li>
            Escrow system to hold value until both parties confirm satisfaction
          </li>
          <li>Ratings and reviews for transparency</li>
        </ul>
        <p className="text-sm mt-2">
          However, using these features does not guarantee the quality or
          legitimacy of a swap and does not absolve users from performing their
          own checks.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Third-Party Services</h2>
        <p className="text-sm">
          SwapConnect may include integrations with or links to third-party
          tools and services (e.g., payment gateways, courier services). We are
          not responsible for the performance, reliability, or privacy practices
          of these third-party services.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          6. Limitation of Liability
        </h2>
        <p className="text-sm mb-2">
          To the fullest extent permitted by law, SwapConnect and its team shall
          not be liable for any direct, indirect, incidental, consequential, or
          punitive damages arising out of:
        </p>
        <ul className="list-disc list-inside text-sm ml-4 space-y-1">
          <li>Use or misuse of the platform</li>
          <li>Item loss, damage, or fraud</li>
          <li>Delay or failure in transactions</li>
          <li>Platform outages or data breaches</li>
        </ul>
        <p className="text-sm mt-2">
          You use the SwapConnect platform at your own risk.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Dispute Resolution</h2>
        <p className="text-sm">
          While we provide a dispute resolution feature and encourage
          responsible use, SwapConnect is not a party to user agreements and
          cannot enforce or undo transactions. Users must resolve conflicts in
          good faith, possibly with third-party mediation.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          8. Changes to This Disclaimer
        </h2>
        <p className="text-sm">
          SwapConnect reserves the right to modify this Disclaimer at any time.
          Updated versions will be posted on the platform with a revised
          effective date. Continued use of the platform implies acceptance of
          any changes.
        </p>
      </section>

      {/* Section 9 */}
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
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

export default TermsOfUsePage;
