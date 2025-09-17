import React from "react";
import Head from "next/head";

const EFFECTIVE_DATE = "September 17, 2025";
const SUPPORT_EMAIL = "aidfinder.app@gmail.com";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — AidFinder</title>
        <meta
          name="description"
          content="AidFinder Privacy Policy describing what we collect, how we use it, sharing, security, and your rights."
        />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="max-w-3xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Effective date: {EFFECTIVE_DATE}</p>
        </header>

        <div className="rounded-2xl bg-gray-50 border p-4 mb-6">
          <p className="text-sm">
            <strong>Summary:</strong> We collect the minimum data needed to run AidFinder (e.g., account
            email and basic usage). We <strong>do not sell or share</strong> your personal information for
            advertising. You can request access or deletion any time at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="underline text-blue-600">
              {SUPPORT_EMAIL}
            </a>.
          </p>
        </div>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">1) Who We Are</h2>
            <p>
              AidFinder (“<strong>AidFinder</strong>,” “we,” “us,” or “our”) helps people discover assistance
              resources across Food, Health, Housing, Financial, and Education categories. This Privacy
              Policy explains how we handle information when you use our web or mobile app
              (collectively, the “<strong>Service</strong>”).
            </p>
            <p className="mt-2 text-sm text-gray-600">
              This policy is for general information and is not legal advice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2) Scope</h2>
            <p>
              This policy applies to information we collect through the Service. It does not cover
              third-party websites or services that we link to; their privacy practices are their own.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3) Information We Collect</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Account information you provide.</strong> Email and password (if you create an
                account), and optional profile details you choose to share.
              </li>
              <li>
                <strong>Communications.</strong> Messages you send us (e.g., via the Contact page or email).
              </li>
              <li>
                <strong>Usage data.</strong> Basic app interactions such as pages viewed, searches made,
                timestamps, and generalized device information (browser, OS). We do not collect precise
                geolocation unless you enter an address/ZIP to find nearby resources.
              </li>
              <li>
                <strong>Log data & security events.</strong> We may log IP address and request metadata to
                operate, secure, and troubleshoot the Service.
              </li>
              <li>
                <strong>Third-party sign-in (if enabled).</strong> If you log in with a provider (e.g., Google),
                we receive limited information necessary to create or authenticate your account.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4) How We Use Information</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Provide, maintain, and improve the Service and its resource listings.</li>
              <li>Authenticate users and protect accounts.</li>
              <li>Respond to support requests and communicate about updates.</li>
              <li>Monitor for abuse, prevent fraud, and enhance security.</li>
              <li>Comply with legal obligations and enforce our Terms of Service.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5) Legal Bases (EEA/UK users)</h2>
            <p className="mb-2">
              If you are in the EEA/UK, we process personal data under these legal bases:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Contract</strong> (to provide the Service you request).</li>
              <li><strong>Legitimate interests</strong> (security, improvement, analytics that respect privacy).</li>
              <li><strong>Consent</strong> (where required, e.g., optional features).</li>
              <li><strong>Legal obligation</strong> (to comply with applicable laws).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6) How We Share Information</h2>
            <p className="mb-2">
              We do not sell or share your personal information for cross-context behavioral advertising.
              We share data only as needed to run the Service or as required by law:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Service providers.</strong> We use trusted vendors to host and operate the Service,
                such as:
                <ul className="list-disc ml-6 mt-2">
                  <li>Vercel (hosting and deployment)</li>
                  <li>Supabase (database, authentication, storage)</li>
                  <li>Email providers (e.g., Gmail) for support communications</li>
                </ul>
              </li>
              <li>
                <strong>Legal and safety.</strong> We may disclose information to comply with law, respond to
                valid legal requests, or protect the rights, safety, and security of users and the Service.
              </li>
              <li>
                <strong>Business transfers.</strong> If we are involved in a merger, acquisition, or asset sale,
                your information may be transferred as part of that transaction.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7) Cookies & Tracking</h2>
            <p>
              We use essential cookies and similar technologies to operate and secure the Service.
              We do not use advertising cookies. If we add non-essential cookies in the future, we will
              update this policy and, where required, request your consent.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8) Data Retention</h2>
            <p>
              We keep personal information only as long as needed for the purposes described in this
              policy (e.g., while you have an account) or as required by law. When no longer needed, we
              delete or de-identify it within a reasonable period.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">9) Security</h2>
            <p>
              We use technical and organizational measures appropriate to the nature of the data
              (e.g., encryption in transit, access controls). No system is 100% secure, but we work to
              protect your information against unauthorized access, use, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">10) Your Rights & Choices</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Access, correct, or delete your personal information.</li>
              <li>Close your account (which initiates deletion of associated personal data, subject to legal holds).</li>
              <li>Opt out of non-essential communications.</li>
            </ul>
            <p className="mt-2">
              To exercise rights, contact us at{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="underline text-blue-600">
                {SUPPORT_EMAIL}
              </a>. We may need to verify your request.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>California (CPRA):</strong> We do not sell or share personal information as defined by CPRA.
              You may request access or deletion via the email above.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>EEA/UK:</strong> You may lodge a complaint with your local data protection authority.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">11) Children’s Privacy</h2>
            <p>
              The Service is not directed to children under 13, and we do not knowingly collect personal
              information from them. If you believe a child has provided personal information, contact us
              and we will take appropriate steps to delete it.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">12) International Transfers</h2>
            <p>
              We may process and store information in the United States and other countries. If you are
              outside the U.S., your data may be transferred to jurisdictions that may not provide the
              same level of data protection as your home country.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">13) Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The “Effective date” above shows when
              it was last updated. If changes are material, we will provide additional notice as required.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">14) Contact Us</h2>
            <p>
              Questions or privacy requests? Email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="underline text-blue-600">
                {SUPPORT_EMAIL}
              </a>.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
