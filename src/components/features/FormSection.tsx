import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaDollarSign, FaBed, FaBus } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';

type FormData = {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  adults: number;
  children: number;
  budget: number;
  accommodation: string;
  transport: string[];
  activities: string[];
  specialRequests: string;
};

export function FormSection(): JSX.Element {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      destination: '',
      startDate: null,
      endDate: null,
      adults: 1,
      children: 0,
      budget: 1000,
      accommodation: '',
      transport: [],
      activities: [],
      specialRequests: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Handle form submission logic here
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-blue-100"
    style={{
      backgroundImage: `url('https://plus.unsplash.com/premium_photo-1683121800585-22bb2ea26583?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="container px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Tell Us About Your Dream Trip</h2>
          <p className="text-lg text-gray-700">Enter a few details, and we'll create a customized travel plan just for you.</p>
        </div>

        <form className="bg-white rounded-lg shadow-xl p-8 max-w-3xl mx-auto border border-gray-300" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Destination Field */}
          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Where do you want to go?
            </label>
            <Controller
              name="destination"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full"
                  placeholder="Search for your destination"
                  {...field}
                />
              )}
            />
            <label className="flex items-center mt-2">
              <Checkbox /> <span className="ml-2">Surprise me with suggestions</span>
            </label>
          </div>

          {/* Travel Dates */}
          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaCalendarAlt className="mr-2" /> When are you planning to travel?
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full"
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
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full"
                    placeholderText="End Date"
                  />
                )}
              />
            </div>
            <label className="flex items-center mt-2">
              <Checkbox /> <span className="ml-2">I’m flexible with dates</span>
            </label>
          </div>

          {/* Number of Travelers */}
          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaUser className="mr-2" /> Number of Travelers
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <Controller
                name="adults"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    min="1"
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full"
                    placeholder="Adults"
                    {...field}
                  />
                )}
              />
              <Controller
                name="children"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    min="0"
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full"
                    placeholder="Children"
                    {...field}
                  />
                )}
              />
            </div>
            <label className="flex items-center mt-2">
              <Checkbox /> <span className="ml-2">Traveling with pets</span>
            </label>
          </div>

          {/* Budget */}
          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaDollarSign className="mr-2" /> What’s your budget?
            </label>
            <Controller
              name="budget"
              control={control}
              render={({ field }) => (
                <Slider
                  value={field.value}
                  onChange={(e, newValue) => field.onChange(newValue)}
                  min={0}
                  max={10000}
                  step={100}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `$${value}`}
                  className="w-full"
                />
              )}
            />
            <p className="text-gray-600 mt-2">Includes transport, stay, and activities.</p>
          </div>

          {/* Accommodation */}
          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaBed className="mr-2" /> Preferred Accommodation
            </label>
            <Controller
              name="accommodation"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ? { label: field.value, value: field.value } : null}
                  onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : '')}
                  options={[
                    { value: 'Budget Hotel', label: 'Budget Hotel' },
                    { value: 'Mid-Range Hotel', label: 'Mid-Range Hotel' },
                    { value: 'Luxury Hotel', label: 'Luxury Hotel' },
                    { value: 'No Accommodation', label: 'No Accommodation' },
                  ]}
                  className="w-full"
                  placeholder="Select accommodation"
                />
              )}
            />
          </div>

          {/* Transport */}
          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaBus className="mr-2" /> Preferred Transport
            </label>
            <Controller
              name="transport"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {['Flights', 'Trains', 'Car Rental', 'Bus'].map((option) => (
                    <label key={option} className="flex items-center">
                      <Checkbox
                        checked={field.value.includes(option)}
                        onChange={() => {
                          if (field.value.includes(option)) {
                            field.onChange(field.value.filter((item) => item !== option));
                          } else {
                            field.onChange([...field.value, option]);
                          }
                        }}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            />
          </div>

          {/* Activities */}
          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
              <FaUser className="mr-2" /> Activities and Interests
            </label>
            <Controller
              name="activities"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {['Adventure', 'Culture', 'Shopping', 'Beaches', 'Nightlife'].map((option) => (
                    <label key={option} className="flex items-center">
                      <Checkbox
                        checked={field.value.includes(option)}
                        onChange={() => {
                          if (field.value.includes(option)) {
                            field.onChange(field.value.filter((item) => item !== option));
                          } else {
                            field.onChange([...field.value, option]);
                          }
                        }}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            />
          </div>

          {/* Special Requests */}
          <div className="mb-6 flex flex-col">
            <label className="text-lg font-medium mb-2">Special Requests or Notes</label>
            <Controller
              name="specialRequests"
              control={control}
              render={({ field }) => (
                <textarea
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full"
                  placeholder="Any additional information"
                  {...field}
                />
              )}
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300 mt-4">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
