'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { motion, Variants } from 'framer-motion';
import {fadeInUp, fadeInLeft, fadeInRight, scaleIn, snapIn, staggerContainer} from "@/lib/framer-motion-animation";


const Privacy = () =>
{
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-10 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">            
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mb-8">
              Privacy Information Notice [DRAFT]
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us and we want you to feel comfortable using our website.
            </p>
          </div>
        </div>
      </section>
      {/* Menu Section */} //TODO
      <section>
      </section>
      {/* Introduction */}
      <section className="py-10 bg-white" id = "introduction">
        <div className="mx-auto max-w-auto px-6 lg:px-8">
          <div className="text-left mb-20">
            <h3 className="text-4xl font-bold text-gray-900 mb-6 text-indigo-600 text-center">
              Introduction
            </h3>
            <p className="text-l text-gray-600 mx-auto px-10">
              ApprentiLink is committed to protecting the rights of individuals in line with the General Data Protection Regulation (reference EU2016/679) of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of Personal Data and on the free movement of such data  (hereinafter referred as : “GDPR”) as well as each applicable national Personal Data protection laws and regulations (collectively referred as “Data Protection Laws and Regulations”). The protection of your privacy and Personal Data is an important concern to which we pay special attention throughout our external recruitment processes.
            </p>
            <br/>
            <p className="text-l text-gray-600 mx-auto px-10">
              However, the Website will include links to other websites or applications which are not necessarily covered by this Privacy Notice. In this event, we encourage you to carefully read when you access and use our website; how we use and disclose your Personal Data; how you can control the use and disclosure of your Personal Data; and how we protect your Personal Data.
            </p>
          </div>
        </div>
      </section>
      {/* FAQs */}
      <section className="py-10 bg-white" id = "faqs">
        <h3 className="text-4xl font-bold text-gray-900 mb-6 text-indigo-600 text-center">
          FAQs
        </h3>
        <div className="mx-auto max-w-auto px-6 lg:px-18">
          <motion.div
            id = "which-sources-and-what-personal-data-do-we-use" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-left mb-20"
          > 
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-black">
              Which sources and what Personal Data do we use?
            </h2>
            <p className="text-l text-gray-600 mx-auto">
              Personal Data is information that can be used to identify a person either directly or indirectly (hereinafter referred as “Personal Data”). This definition covers a wide range of data enabling the identification of an individual.
              <br/><br/>
              The category of Personal Data we process under ApprentiLink are described below.
              <br/>
              Such list can evolve in order to be compliant with local legal obligations:
              <ul className="list-disc pl-6">
                <li><b>Identification data and contact details</b> (Name, First Name; Home address; Mobile Phone Number; personal email address; Nationality; Age; Age Range; Date of Birth; Marital Status, Criminal Record; Avatar; Photo; Awards, Prizes or Recognition, Zip/Postal Code; Country or place of Birth etc…)</li>
                <li><b>Application Hiring</b> (Curriculum Vitae / Resume; Education, Education Level; Educational Institution; Experience; Letters of Reference; References; Work History; Hobbies; Interest Categories; Community involvement; Club/charity group membership (not political or religious); Education Program; Education Records; Exam/Test Results; High School Diploma; Grades / GPA; Green Card Holder; Military service information, Data concerning interviews, etc…)</li>
                <li><b>IT data /Digital activity data</b> (IP address, MAC address, logs, device type…)</li>
                <li><b>Account information</b> (Role and permissions, settings and preferences, login, password…)</li>
              </ul>
              <br/>
              We may collect this personal data:
              <ul className="list-disc pl-6">
                <li><b>Directly</b> from you while completing your candidate profile and taking the different assessment (by fulfilling a form, by entering contact details, by navigating to our external recruitment Websites, etc…).</li>
                <li><b>Indirectly</b> for those Personal Data that you have made publicly available and/or from third parties in particular from professional social media, temporary agencies and headhunting processes.</li>
              </ul>
              <br/>
              In the case that you are hired, the personal data you have provided in your candidate profile (directly or indirectly) will be transferred to your employer.
            </p>
          </motion.div>
          <motion.div 
            id = "purposes-of-the-processing-of-personal-data" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-left mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-black">
              What are the purposes of the processing of your Personal Data?
            </h2>
            <p className="text-l text-gray-600 mx-auto">
              By using the website, ApprentiLink will collect and process your Personal Data for the following purposes (hereinafter referred as: the ‘Purposes’):
              <ul className="list-disc pl-6">
                <li><b>Recruitment.</b> Conduct Education / Credentials Checks; Conduct Interviews; Conduct or Attend Recruiting Events; Conduct Reference Checks; Facilitate Corporate Communications and Collaboration; Gather Data about Candidates in Response to Job Postings;  Identify and attract qualified candidates through resume and job posting websites; Identify and Attract Qualified Candidates through Social Media; Report Diversity Statistics; Verify Identity.
                  <ul className="list-disc pl-6">
                    <li>Managing your candidate profile, applications and exchanges with ApprentiLink</li>
                    <li>Ensure applications selection by checking the adequacy of your application with positions to be filled;</li>
                    <li>Sourcing applications for open positions or recruitment events from our recruiting tool or other sources such as professional social networks</li>
                    <li>Gather Data about Candidates in Response to Job Postings</li>
                    <li>Sending communications on potential positions which are relevant to individual candidates</li>
                  </ul>
                </li>
                <li><b>Research and development.</b> We use your Personal Data for research and development purposes, including improving our websites, applications, services, and users experience and for other research and analytical purposes dedicated to improving our products, services, businesses, operations and processes.</li>
                <li><b>Audit, reporting and investigations.</b> We may also use your Personal Data for Internal investigations, reporting of ethics and compliance incident and conflict of interest management, export control compliance, litigation management, company law duties and mandates management.</li>
                <li><b>Legal compliance.</b> We use your Personal Data to comply with applicable legal obligations, including responding to an authority or court order or discovery request.</li>
                <li><b>To protect us and others.</b> Where we believe it is necessary to investigate, prevent or take action regarding illegal activities, suspected fraud, situations involving potential threats to the safety of any person or violations of policies, terms, and other policies</li>
                <li><b>For data analytics.</b> We use your Personal data for IT resource optimisation, website performance and process improvement, ensuring and preserving ApprentiLink Interest, and answering social agreements and/or legal obligation.</li>
              </ul>
            <br/>
            We will use your personal information for the above Purposes only, unless we reasonably consider that we need to use it for another reason and that reason is compatible with the original purpose (for preserving particular evidence under the applicable Data Protection Laws and Regulations, or in the context of legal statutes of limitation for example). If we need to use your Personal Data for an unrelated purpose, we will notify you prior this further Personal Data processing and provide you the relevant privacy information notice. 
            </p>
          </motion.div>
          <motion.div 
            id = "legal-basis-for-the-processing-of-personal-data" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-left mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-black">
              What is the legal basis for the processing of your Personal Data?
            </h2>
            <p className="text-l text-gray-600 mx-auto">
              As a responsible company, we need a lawful basis for collecting and/or processing your Personal Data in accordance with the provisions set out in the GDPR and the relevant applicable Data Protection Laws and Regulations.
              <br/>
              The legal basis for processing your Personal Data under this Privacy Notice are:
              <ul className="list-disc pl-6">
                <li><b>To comply with contractual obligations.</b> When you create your profile in the ApprentiLink website, the purposes of processing your Personal Data are primarily determined by that service and we will process your information so that we can provide that service to you.</li>
                <li><b>As a result of your consent.</b> When you have consented to the processing of your Personal Data by us for certain services through Airbus External Recruitment Website, you can withdraw consent. For further information on the right of withdrawal, please see below Sections <Link href="#rights">“What are your rights?"</Link> and <Link href="#how-to-exercise-your-rights">"How to exercise your rights and/or contact ApprentiLink in respect of your Personal Data?"</Link></li>
                <li><b>Within the scope of legitimate interest.</b> On occasion taking into account the minimum privacy impact for you, the processing of your personal data might be necessary for the following legitimate interest:
                  <ul className="list-disc pl-6">
                    <li>for Compliance with foreign law, law enforcement, court and regulatory bodies’ requirements</li>
                    <li>for Information, system, network and cyber security within ApprentiLink</li>
                    <li>due diligence</li>
                    <li>for Product development and enhancement (incl. the analysis and optimisation of the Website/Process/Application/Newsletter</li>
                    <li>for Communications, marketing and intelligence</li>
                  </ul>
                </li>
                <li><b>On the basis of ApprentiLink’s legal obligations.</b> ApprentiLink, as any other organisation, is subject to legal obligations and regulations. In some cases the processing of your Personal Data will be necessary for ApprentiLink in order to fulfill these obligations.</li>
              </ul>
            <br/>
            </p>
          </motion.div>
          <motion.div 
            id = "how-long-will-personal-data-be-stored" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-left mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-black">
              How long will your personal data be stored?
            </h2>
            <p className="text-l text-gray-600 mx-auto">
              We process and store your Personal Data for at least 12 months from the date of collection in accordance with the GDPR or any local data protection laws requirements or as long as it is required to meet our contractual and statutory obligations. In case of inactivity your Personal Data will be deleted after 12 months from your last interaction.
            </p>
          </motion.div>
          <motion.div 
            id = "security-of-personal-data"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-left mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-black">
              What about the security of your Personal Data?
            </h2>
            <p className="text-l text-gray-600 mx-auto">
              We use technical and organisational security measures in order to protect the Personal Data we have under our control against accidental or intentional manipulation, loss, destruction and against access by unauthorised persons. Our security procedures are continually enhanced as new technology becomes available.
            </p>
          </motion.div>
          <motion.div 
            id = "rights"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-left mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-black">
              What are your rights?
            </h2>
            <p className="text-l text-gray-600 mx-auto">
              Under some circumstances provided by law, you may at any time exercise your data protection rights as listed below:
              <ul className="list-disc pl-6">
                <li><b>Right to access/obtain a report detailing the information held about you: </b>You have the right to obtain confirmation as to whether or not your Personal Data is being processed by ApprentiLink and if so, what specific personal data is being processed.</li>
                <li><b>Right to correct Personal Data: </b>You have the right to rectify or request to have rectified any inaccurate Personal Data concerning you.</li>
                <li><b>Right to be forgotten: </b>In some cases, for instance, when the Personal Data is no longer necessary in relation to the Purposes for which they were collected, you have the right for your Personal Data to be erased.</li>
                <li><b>Right to restrict the processing of your Personal Data: </b>You have the right to restrict the processing of your Personal Data, for instance when the processing is unlawful and you oppose the erasure of your Personal Data. In such cases, your Personal Data will only be processed with your consent or for the exercise or defense of legal claims.</li>
                <li><b>Right to data portability: </b>You have the right to receive the Personal Data concerning you in a structured, commonly used and machine-readable format and/or transmit those Personal Data to another data controller.</li>
                <li><b>Right to object: </b>In some cases required by law, you may ask us to stop processing your Personal Data.</li>
                <li><b>Right to withdraw consent: </b>Where your consent is required, you may at any time withdraw such consent by contacting us at the contact details in section <Link href="#how-to-exercise-your-rights">“How to exercise your rights and/or contact ApprentiLink in respect of your Personal  Data?”</Link>. However, please note that if you withdraw your consent, you may not be able to access and use certain information, features or services as described in section “Are you obliged to provide your Personal Data?”.</li>
              </ul>
            <br/>
            </p>
          </motion.div>
          <motion.div 
            id = "how-to-exercise-your-rights"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-left mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-black">
              How to exercise your rights and/or contact ApprentiLink in respect of your Personal Data?
            </h2>
            <p className="text-l text-gray-600 mx-auto">
              If you want to exercise your rights or you are unhappy with the way in which your Personal Data has been processed or should you have any questions regarding the processing of your Personal Data, you may refer in the first instance to the Airbus Data Protection Officer, who is available, at the following email address:
              <br/>
              EXAMPLE@APRENTILINK.COM
              <br/>
              or you can write to the address below:
              <br/>
              ADDRESS
              <br/><br/>
              In case of doubt of your identity, we may ask you to justify it by enclosing a copy of any identity document.
            </p>
          </motion.div>
          <motion.div 
            id = "automated-decision-making"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-left mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-black">
              Are your Personal Data the basis for automated decision-making, including profiling?
            </h2>
            <p className="text-l text-gray-600 mx-auto">
              As a matter of principle, we do not use fully automated decision-making processes, including profiling. In the event that we should use such processes, we will if prescribed by law, specifically inform you in advance of this and your rights in this respect.
            </p>
          </motion.div>
          <motion.div 
            id = "assistance-from-competent-authorities"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-left mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-black">
              How to ask for assistance from the competent authorities?
            </h2>
            <p className="text-l text-gray-600 mx-auto">
              If you remain unsatisfied, then you have the right to apply directly to a Data Protection Supervisory Authority. In the UK, this is the <a href="https://ico.org.uk/" target="_blank">ICO: Supervisory Authority UK.</a>
            </p>
          </motion.div>
        </div>
      </section>
      {/*Cookies Policy*/}
      <section className="py-10 bg-white" id = "cookies-policy">
        <h3 className="text-4xl font-bold text-gray-900 mb-6 text-indigo-600 text-center">
          Cookies Policy
        </h3>
        <div className="mx-auto max-w-auto px-6 lg:px-18">
          <motion.div
            id = "what-are-cookies" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-left mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-black">
                What are cookies?
            </h2>
            <p className="text-l text-gray-600 mx-auto">
              Cookies are small files that may be downloaded on your device when you access and use the ApprentiLink website. They allow the Website to recognise your device and store information about your preferences or past actions. We use cookies to record the preferences of our users, to enable us to optimise the design of the ApprentiLink website. They ease navigation, and increase the user-friendliness of websites and applications. Cookies also help us to identify the most popular sections of the ApprentiLink website. This enables us to provide content that is more accurately suited to your needs, and, in doing so, improve our service. Cookies can be used to determine whether there has been any contact between us and your device in the past.
              <br/>
              Only the cookie on your device is identified.
            </p>
          </motion.div>
          <motion.div 
            id = "what-cookies-do-we-use"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-left mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-black">
                What cookies do we use?
            </h2>
            <p className="text-l text-gray-600 mx-auto">
              Please find a table below with specific information for each cookie that we may use on our website: 
            </p>
            <br/>
            <table className="table-auto w-full text-l text-gray-800">
              <thead className="bg-gray-700 text-white">
                <th scope="col" className="px-3"><strong>NAME OF COOKIES</strong></th>
                <th scope="col" className="px-3"><strong>PURPOSE</strong></th>
                <th scope="col" className="px-3"><strong>RETENTION PERIOD</strong></th>
              </thead>
              <tbody>
                <tr className="odd:bg-gray-100 even:bg-gray-300">
                  <td className="px-3">PLAY_SESSION</td>
                  <td className="px-3">Session Handling Data</td>
                  <td className="px-3">Session duration</td>
                </tr>
                <tr className="odd:bg-gray-100 even:bg-gray-300">
                  <td className="px-3">WORKDAYLB_UICLIENT</td>
                  <td className="px-3">Ensures a single user session is routed to the same server for consistent data handling</td>
                  <td className="px-3">Session duration</td>
                </tr>
              </tbody>
            </table>
            <br/>
            <p className="text-l text-gray-600 mx-auto">
              Some cookies are strictly necessary for technical reasons. 
            </p>
          </motion.div>
        </div>
      </section>
      {/*Modification of the Privacy Notice*/}
      <section className="py-10 bg-white" id = "modification-of-the-privacy-notice">
        <h3 className="text-4xl font-bold text-gray-900 mb-6 text-indigo-600 text-center">
          Modification of the Privacy Notice
        </h3>
        <div className="mx-auto max-w-auto px-6 lg:px-18">
            <p className="text-l text-gray-600 mx-auto">
              ApprentiLink will update this Privacy Notice from time to time in order to reflect the changes in our practices and services and also to remain compliant to Data Protection Laws and Regulations. We will inform you of any substantial modification in how we process your Personal Data.
            </p>
        </div>
      </section>

      <footer className="bg-gray-700">
        <div className="mx-auto px-6 py-12 mt-12 lg:px-8">
          <span className="text-white font-bold text-4xl">Still have a question on our Privacy Notice?</span>
          <p className="text-gray-200 max-w-md text-3xl"><br/>Contact us</p>
          <p className="text-gray-200 max-w-md text-3xl"><EnvelopeIcon className="w-5 h-5 ml-2 inline"/> example@apprentilink.com</p>
        </div>
      </footer>
    </div>
  );
}

export default Privacy;
