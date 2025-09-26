'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, UserGroupIcon, BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/solid';
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
      <section className="py-10 bg-white">
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
      <section className="py-10 bg-white">
        <h3 className="text-4xl font-bold text-gray-900 mb-6 text-indigo-600 text-center">
          FAQs
        </h3>
        <div className="mx-auto max-w-auto px-6 lg:px-18">
          <motion.div 
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
        </div>
      </section>
    </div>
  );
}

export default Privacy;
