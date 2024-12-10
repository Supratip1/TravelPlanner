import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaDollarSign, FaBed, FaBus, FaUsers, FaCheck, FaUtensils, FaConciergeBell, FaPlane } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select, { SingleValue } from 'react-select';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

// Define the form data type
type FormData = {
  fullName: string;
  email: string;
  phone?: string;
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  numberOfTravelers: number;
  preferredTravelClass: string;
  budget: number;
  budgetInRupees: number; // Added for the INR budget slider
  currency: 'USD' | 'INR';
  accommodation: string;
  mealPreferences: string[];
  activities: string[];
  specialRequests: string;
  paymentMethod: string;
  contactMethod: string;
  feedback: string;
  agreeToTerms: boolean;
  privacyConsent: boolean;
  accessibilityNeeds: string;
  preferredTransport: string;
  travelInsurance: boolean;
  culturalInterests: string[];
};

type OptionType = {
  value: string;
  label: string;
};

export function FormSection(): JSX.Element {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      destination: '',
      startDate: null,
      endDate: null,
      numberOfTravelers: 1,
      preferredTravelClass: 'Economy',
      budget: 1000,
      accommodation: 'Hotel',
      mealPreferences: [],
      activities: [],
      specialRequests: '',
      paymentMethod: 'Credit Card',
      contactMethod: 'Email',
      feedback: '',
      agreeToTerms: false,
      privacyConsent: false,
      accessibilityNeeds: '',
      preferredTransport: 'Plane',
      travelInsurance: false,
      culturalInterests: [],
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Add form submission logic here
  };

  return (
    <section
      className="py-20 bg-gradient-to-r from-blue-50 to-blue-100"
      style={{
        backgroundImage: `url('https://plus.unsplash.com/premium_photo-1683121800585-22bb2ea26583?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container px-6 w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Plan Your Perfect Trip</h2>
          <p className="text-lg text-gray-700">Complete the form with your travel preferences and requirements.</p>
        </div>

        <form
  className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl mx-auto border border-gray-300"
  onSubmit={handleSubmit(onSubmit)}
>

          {/* Personal Information */}
          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaUser className="mr-2" /> Full Name
            </label>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => <TextField {...field} variant="outlined" fullWidth placeholder="Enter your full name" />}
            />
          </div>

          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Email Address
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <TextField {...field} type="email" variant="outlined" fullWidth placeholder="Enter your email" />}
            />
          </div>

          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaUser className="mr-2" /> Phone Number (Optional)
            </label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <TextField {...field} type="tel" variant="outlined" fullWidth placeholder="Enter your phone number" />}
            />
          </div>

          {/* Destination */}
          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Destination
            </label>
            <Controller
              name="destination"
              control={control}
              render={({ field }) => (
                <TextField {...field} variant="outlined" fullWidth placeholder="Enter your destination" />
              )}
            />
          </div>

          {/* Travel Dates */}
          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaCalendarAlt className="mr-2" /> Travel Dates
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="p-3 border border-gray-300 rounded-lg w-full"
                    placeholderText="Start Date"
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="p-3 border border-gray-300 rounded-lg w-full"
                    placeholderText="End Date"
                  />
                )}
              />
            </div>
          </div>

          {/* Budget in Rupees */}
          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              Budget (INR)
            </label>
            <Controller
              name="budgetInRupees"
              control={control}
              render={({ field }) => (
                <Slider
                  value={field.value}
                  onChange={(e, newValue) => field.onChange(newValue)}
                  min={0}
                  max={100000}
                  step={1000}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `₹${value}`}
                  className="w-full"
                />
              )}
            />
            <p className="text-gray-600 mt-2">Includes transport, stay, and activities.</p>
          </div>

          {/* Additional Details */}
          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaCheck className="mr-2" /> Accessibility Needs
            </label>
            <Controller
              name="accessibilityNeeds"
              control={control}
              render={({ field }) => (
                <TextField {...field} variant="outlined" fullWidth placeholder="Specify any accessibility requirements" />
              )}
            />
          </div>

          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaBus className="mr-2" /> Preferred Transport
            </label>
            <Controller
              name="preferredTransport"
              control={control}
              render={({ field }) => (
                <Select<OptionType>
                  {...field}
                  options={[
                    { value: 'Plane', label: 'Plane' },
                    { value: 'Train', label: 'Train' },
                    { value: 'Bus', label: 'Bus' },
                    { value: 'Car', label: 'Car' },
                  ]}
                  onChange={(option: SingleValue<OptionType>) => {
                    field.onChange(option?.value);
                  }}
                  value={
                    field.value ? { value: field.value, label: field.value } : null
                  }
                  placeholder="Choose transport mode"
                />
              )}
            />
          </div>

          {/* Dietary Preferences */}
          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaUtensils className="mr-2" /> Dietary Preferences
            </label>
            <Controller
              name="mealPreferences"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={[
                    { value: 'Vegetarian', label: 'Vegetarian' },
                    { value: 'Vegan', label: 'Vegan' },
                    { value: 'Gluten-Free', label: 'Gluten-Free' },
                    { value: 'Halal', label: 'Halal' },
                    { value: 'Kosher', label: 'Kosher' },
                  ]}
                  onChange={(selectedOptions: any) => {
                    field.onChange(selectedOptions.map((option: any) => option.value));
                  }}
                  placeholder="Select meal preferences"
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
