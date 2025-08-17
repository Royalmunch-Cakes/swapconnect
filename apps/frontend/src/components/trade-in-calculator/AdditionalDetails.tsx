"use client";

import type React from "react";
import type { ComputerFormData } from "@/types/trade-in";
import { FaChevronRight } from "react-icons/fa";

interface AdditionalDetailsProps {
  formData: ComputerFormData;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({
  formData,
  onChange,
}) => (
  <div className="grid grid-cols-1 gap-y-4">
    {/* Auto On/Off */}
    <div className="relative mb-3">
      <label
        htmlFor="autoOnOff"
        className="block text-gray-700 text-sm font-medium mb-1"
      >
        Does your laptop turn off and on automatically?
      </label>
      <select
        id="autoOnOff"
        name="autoOnOff"
        value={formData.autoOnOff}
        onChange={onChange}
        className="form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm appearance-none pr-10"
      >
        <option value="">Select Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      <FaChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
    </div>

    {/* Body Condition */}
    <div className="relative mb-3">
      <label
        htmlFor="bodyCondition"
        className="block text-gray-700 text-sm font-medium mb-1"
      >
        What is the condition of your laptop&apos;s body?
      </label>
      <select
        id="bodyCondition"
        name="bodyCondition"
        value={formData.bodyCondition}
        onChange={onChange}
        className="form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm appearance-none pr-10"
      >
        <option value="">Select Option</option>
        <option value="perfect">Perfect</option>
        <option value="good">Good (minor wear)</option>
        <option value="fair">Fair (visible scratches/dents)</option>
        <option value="poor">Poor (significant damage)</option>
      </select>
      <FaChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
    </div>

    {/* Screen Condition */}
    <div className="relative mb-3">
      <label
        htmlFor="screenCondition"
        className="block text-gray-700 text-sm font-medium mb-1"
      >
        What is the condition of your laptop&apos;s screen?
      </label>
      <select
        id="screenCondition"
        name="screenCondition"
        value={formData.screenCondition}
        onChange={onChange}
        className="form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm appearance-none pr-10"
      >
        <option value="">Select Option</option>
        <option value="perfect">Perfect</option>
        <option value="good">Good (minor scratches)</option>
        <option value="fair">Fair (visible scratches)</option>
        <option value="poor">Poor (cracks/dead pixels)</option>
      </select>
      <FaChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
    </div>

    {/* Repair Visits */}
    <div className="relative mb-3">
      <label
        htmlFor="repairVisits"
        className="block text-gray-700 text-sm font-medium mb-1"
      >
        How many times have you visited a technician for repair?
      </label>
      <select
        id="repairVisits"
        name="repairVisits"
        value={formData.repairVisits}
        onChange={onChange}
        className="form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm appearance-none pr-10"
      >
        <option value="">Select Option</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2-3">2 - 3</option>
        <option value="more-than-3-times">More than three times</option>
      </select>
      <FaChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
    </div>

    {/* Biometric Function */}
    <div className="relative mb-3">
      <label
        htmlFor="biometricFunction"
        className="block text-gray-700 text-sm font-medium mb-1"
      >
        Where applicable, does fingerprint reader or face recognition work
        normally?
      </label>
      <select
        id="biometricFunction"
        name="biometricFunction"
        value={formData.biometricFunction}
        onChange={onChange}
        className="form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm appearance-none pr-10"
      >
        <option value="">Select Option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        <option value="not_applicable">Not Applicable</option>
      </select>
      <FaChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

export default AdditionalDetails;
