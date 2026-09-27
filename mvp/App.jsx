const { useState } = React;

const SERVICES = [
  { id: 1, name: 'Classic Haircut', duration: '30 min', price: '$30', description: 'Precision cut, wash, and style.' },
  { id: 2, name: 'Beard Trim & Shape', duration: '20 min', price: '$20', description: 'Hot towel finish and razor line-up.' },
  { id: 3, name: 'Full Grooming Package', duration: '60 min', price: '$50', description: 'Haircut, beard trim, and facial treatment.' },
];

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

function App() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '' });
  const [bookings, setBookings] = useState([]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const newBooking = {
      id: Date.now(),
      service: selectedService.name,
      date: selectedDate,
      time: selectedTime,
      ...clientInfo,
    };
    setBookings([newBooking, ...bookings]);
    setStep(4);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'sans-serif' }}>
      <header style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#4f46e5' }}>✂️ Apex Cuts Studio</h1>
        <span style={{ fontSize: 12, background: '#eef2ff', color: '#4338ca', padding: '6px 12px', borderRadius: 999, fontWeight: 600 }}>MVP Booking Portal</span>
      </header>

      <main style={{ maxWidth: 780, margin: '0 auto', padding: '32px 16px' }}>
        {step < 4 && (
          <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            {['Select Service', 'Pick Date & Time', 'Your Details'].map((label, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', color: step > idx + 1 ? '#4f46e5' : step === idx + 1 ? '#0f172a' : '#94a3b8', fontWeight: step === idx + 1 ? 700 : step > idx + 1 ? 600 : 500 }}>
                <span style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8, fontSize: 13, background: step === idx + 1 ? '#4f46e5' : '#e2e8f0', color: step === idx + 1 ? '#fff' : '#475569' }}>
                  {idx + 1}
                </span>
                {label}
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: 24 }}>
            <h2 style={{ marginTop: 0, marginBottom: 20, fontSize: 20 }}>Choose a Service</h2>
            <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  style={{ padding: 16, borderRadius: 16, border: selectedService.id === s.id ? '1px solid #4f46e5' : '1px solid #e2e8f0', background: selectedService.id === s.id ? '#eef2ff' : '#fff', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700 }}>
                    <span>{s.name}</span>
                    <span style={{ color: '#4f46e5' }}>{s.price}</span>
                  </div>
                  <p style={{ margin: '8px 0 0', color: '#475569', fontSize: 14 }}>{s.description}</p>
                  <span style={{ fontSize: 12, color: '#64748b', display: 'inline-block', marginTop: 8 }}>⏱️ {s.duration}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(2)} style={{ width: '100%', background: '#4f46e5', color: '#fff', border: 'none', padding: '14px 18px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>
              Continue to Date & Time
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: 24 }}>
            <h2 style={{ marginTop: 0, marginBottom: 20, fontSize: 20 }}>Select Date & Time</h2>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 8, color: '#334155', fontSize: 14, fontWeight: 600 }}>Date</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', marginBottom: 10, color: '#334155', fontSize: 14, fontWeight: 600 }}>Available Slots</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    style={{ padding: '10px 12px', borderRadius: 12, border: selectedTime === time ? '1px solid #4f46e5' : '1px solid #cbd5e1', background: selectedTime === time ? '#4f46e5' : '#fff', color: selectedTime === time ? '#fff' : '#334155', fontWeight: 600, cursor: 'pointer' }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(1)} style={{ width: '33%', background: '#e2e8f0', color: '#334155', border: 'none', padding: '14px 18px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>
                Back
              </button>
              <button disabled={!selectedDate || !selectedTime} onClick={() => setStep(3)} style={{ width: '67%', background: '#4f46e5', color: '#fff', border: 'none', padding: '14px 18px', borderRadius: 12, fontWeight: 700, cursor: !selectedDate || !selectedTime ? 'not-allowed' : 'pointer', opacity: !selectedDate || !selectedTime ? 0.55 : 1 }}>
                Continue to Details
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleBookingSubmit} style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: 24 }}>
            <h2 style={{ marginTop: 0, marginBottom: 20, fontSize: 20 }}>Enter Your Contact Info</h2>
            <div style={{ display: 'grid', gap: 18, marginBottom: 24 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, color: '#334155', fontSize: 14, fontWeight: 600 }}>Full Name</label>
                <input type="text" required value={clientInfo.name} onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })} placeholder="John Doe" style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, color: '#334155', fontSize: 14, fontWeight: 600 }}>Email Address</label>
                <input type="email" required value={clientInfo.email} onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })} placeholder="john@example.com" style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, color: '#334155', fontSize: 14, fontWeight: 600 }}>Phone Number</label>
                <input type="tel" required value={clientInfo.phone} onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })} placeholder="+1 (555) 000-0000" style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="button" onClick={() => setStep(2)} style={{ width: '33%', background: '#e2e8f0', color: '#334155', border: 'none', padding: '14px 18px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>
                Back
              </button>
              <button type="submit" style={{ width: '67%', background: '#4f46e5', color: '#fff', border: 'none', padding: '14px 18px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>
                Confirm Booking
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: 32, textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 16px' }}>✓</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 28 }}>Booking Confirmed!</h2>
            <p style={{ color: '#475569', marginBottom: 24 }}>We've received your appointment request and sent a confirmation to your email.</p>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: 16, textAlign: 'left', marginBottom: 24 }}>
              <p><strong>Service:</strong> {selectedService.name} ({selectedService.price})</p>
              <p><strong>Date & Time:</strong> {selectedDate} at {selectedTime}</p>
              <p><strong>Client:</strong> {clientInfo.name} ({clientInfo.phone})</p>
            </div>

            <button onClick={() => { setStep(1); setSelectedDate(''); setSelectedTime(''); setClientInfo({ name: '', email: '', phone: '' }); }} style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '14px 22px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>
              Book Another Appointment
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);