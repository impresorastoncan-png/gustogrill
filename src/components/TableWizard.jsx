import { useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { FaUser, FaPhone, FaEnvelope, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

const WEBHOOK_URL = 'https://your-webhook-url.com/confirm'; // Placeholder

const partySizes = [2, 3, 4, 5, 6, '8+'];
const seatingZones = ['Main Dining Room', 'Garden Patio', 'Chef\'s Counter'];
const timeSlots = [
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
  "9:00 PM", "9:30 PM", "10:00 PM"
];

const TableWizard = ({ closeWizard }) => {
    const [step, setStep] = useState(1);
    const [reservation, setReservation] = useState({
        partySize: null,
        date: new Date().toISOString().split('T')[0],
        seatingZone: null,
        timeSlot: null,
        name: '',
        phone: '',
        email: '',
        occasion: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSelect = (key, value) => {
        setReservation(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const payload = {
                ...reservation
            };

            // In a real app, you would use fetch:
            // const response = await fetch(WEBHOOK_URL, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(payload)
            // });
            // if (!response.ok) throw new Error('Network response was not ok');
            
            console.log('Reservation Payload:', payload);
            setStatus('success');
        } catch (error) {
            console.error("Failed to submit reservation:", error);
            setStatus('error');
        }
    };
    
    if (status === 'loading') {
        return (
            <div className="glassmorphism-card w-full max-w-md p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-serif text-white">Connecting to Bella...</h3>
                <p className="text-gray-300 mt-2">Please wait while we send your request.</p>
                <div className="animate-pulse mt-6 text-brand-red text-4xl">. . .</div>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="glassmorphism-card w-full max-w-md p-8 rounded-2xl text-center">
                <h3 className="text-3xl font-serif text-brand-gold">Request Received!</h3>
                <p className="text-gray-200 mt-4 text-lg">Check your phone. Bella has sent you a message to confirm.</p>
                <button
                    onClick={closeWizard}
                    className="mt-8 px-6 py-2 bg-brand-red hover:bg-red-700 text-white font-bold rounded-md"
                >
                    Close
                </button>
            </div>
        );
    }


    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h3 className="text-2xl font-serif text-center">Select Your Party Size</h3>
                        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap my-8">
                            {partySizes.map(size => (
                                <button key={size} onClick={() => { handleSelect('partySize', size); setStep(2); }}
                                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-xl font-bold transition-all duration-300 ${ 
                                        reservation.partySize === size 
                                        ? 'bg-brand-red border-brand-red text-white scale-110' 
                                        : 'border-gray-600 hover:border-brand-red'
                                    }`}> 
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3 className="text-2xl font-serif text-center mb-6">Choose Date & Seating</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <input type="date" value={reservation.date} onChange={e => handleSelect('date', e.target.value)}
                                   className="premium-input text-white p-3 rounded-lg bg-black/20 border-gray-600"/>
                            
                            {seatingZones.map(zone => (
                                <button key={zone} onClick={() => { handleSelect('seatingZone', zone); setStep(3); }}
                                    className={`p-4 rounded-lg text-left transition-all duration-300 border-2 ${ 
                                        reservation.seatingZone === zone
                                        ? 'bg-brand-red/80 border-brand-red'
                                        : 'bg-black/20 border-gray-600 hover:border-brand-red'
                                    }`}> 
                                    <span className="font-bold">{zone}</span>
                                    <span className="text-sm block text-gray-300">{zone.includes('Garden') ? 'Outdoor' : 'Indoor'}</span>
                                </button>
                            ))}
                        </div>
                         <button onClick={() => setStep(1)} className="text-gray-400 mt-6 text-sm">Back</button>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h3 className="text-2xl font-serif text-center mb-6">Select a Time Slot</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-center">
                            {timeSlots.map(time => (
                                <button key={time} onClick={() => { handleSelect('timeSlot', time); setStep(4); }}
                                    className={`relative p-3 rounded-md transition-colors duration-300 ${ 
                                        reservation.timeSlot === time
                                        ? 'bg-brand-red text-white'
                                        : 'bg-black/20 hover:bg-black/40'
                                    }`}> 
                                    {time}
                                    {(time === '7:00 PM' || time === '8:00 PM') && 
                                        <span className="absolute -top-2 -right-2 text-xs bg-brand-gold text-black font-bold px-2 py-0.5 rounded-full">High Demand</span>
                                    }
                                </button>
                            ))}
                        </div>
                         <button onClick={() => setStep(2)} className="text-gray-400 mt-6 text-sm">Back</button>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h3 className="text-2xl font-serif text-center mb-6">Your Details</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                               <FaUser className="absolute left-0 top-3 text-gray-400"/>
                               <input type="text" placeholder="Full Name" required value={reservation.name} onChange={e => handleSelect('name', e.target.value)} className="premium-input pl-8"/>
                            </div>
                            <div className="relative">
                               <FaPhone className="absolute left-0 top-3 text-gray-400"/>
                               <input type="tel" placeholder="Phone Number" required value={reservation.phone} onChange={e => handleSelect('phone', e.target.value)} className="premium-input pl-8"/>
                            </div>
                            <div className="relative">
                               <FaEnvelope className="absolute left-0 top-3 text-gray-400"/>
                               <input type="email" placeholder="Email Address" required value={reservation.email} onChange={e => handleSelect('email', e.target.value)} className="premium-input pl-8"/>
                            </div>
                            <select value={reservation.occasion} onChange={e => handleSelect('occasion', e.target.value)} className="premium-input bg-dark-charcoal/50">
                                <option value="">Any Special Occasion?</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Anniversary">Anniversary</option>
                                <option value="Other">Other</option>
                            </select>

                            <div className="mt-6 p-4 bg-yellow-900/30 border border-brand-gold rounded-lg text-center">
                                <p className="text-sm text-yellow-200">Our AI Concierge, 'Bella', will text you immediately to confirm this request. <span className="font-bold">Please reply to her SMS to secure your table.</span></p>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <button type="button" onClick={() => setStep(3)} className="text-gray-400 text-sm">Back</button>
                                <button type="submit" className="px-8 py-3 bg-brand-red hover:bg-red-700 text-white font-bold rounded-md">
                                    Request Confirmation
                                </button>
                            </div>
                        </form>
                    </div>
                );
            default: return null;
        }
    }

    return (
      <div className="glassmorphism-card w-full max-w-lg p-6 sm:p-8 rounded-2xl relative text-white animate-fade-in-up">
          <button onClick={closeWizard} className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-white transition-colors">
              <IoIosCloseCircle />
          </button>
          {renderStep()}
      </div>
    );
}

export default TableWizard;
