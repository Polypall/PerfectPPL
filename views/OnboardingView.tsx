
import React, { useState, useRef } from 'react';
import { UserProfile, Disability } from '../types';
import { DISABILITIES, HOBBIES } from '../constants';
import HeartButton from '../components/HeartButton';

const OnboardingView: React.FC<{ email: string, onComplete: (profile: UserProfile) => void }> = ({ email, onComplete }) => {
  const [name, setName] = useState('');
  const [selectedDisabilities, setSelectedDisabilities] = useState<Disability[]>([]);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [favoriteMedia, setFavoriteMedia] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState<'local' | 'global'>('local');
  const [matchPref, setMatchPref] = useState<'same' | 'different' | 'both'>('both');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleItem = (list: any[], setList: Function, item: any) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinish = () => {
    if (!name || selectedDisabilities.length === 0) {
      alert("Please enter your name and at least one disability.");
      return;
    }
    onComplete({
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      profilePic: profilePic || undefined,
      disabilities: selectedDisabilities,
      hobbies: selectedHobbies,
      favoriteMedia: favoriteMedia.split(',').map(m => m.trim()).filter(m => m !== ''),
      location,
      matchPreference: matchPref,
      bio
    });
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 border-4 border-pink-100">
        <h2 className="fancy-title text-4xl text-pink-600 text-center text-outline mb-8">Tell us about you</h2>
        
        <div className="space-y-8">
          <section className="flex flex-col items-center">
            <label className="block text-pink-700 font-bold mb-4">Profile Picture</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-32 h-32 rounded-full border-4 border-dashed border-pink-200 flex items-center justify-center cursor-pointer overflow-hidden bg-pink-50 hover:border-pink-400 transition-all"
            >
              {profilePic ? (
                <img src={profilePic} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-pink-300 text-4xl">+</span>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/jpeg,image/jpg" 
              className="hidden" 
            />
            <p className="text-xs text-pink-400 mt-2 font-bold">JPG or JPEG preferred</p>
          </section>

          <section>
            <label className="block text-pink-700 font-bold mb-2">Your Beautiful Name</label>
            <input 
              className="w-full p-4 rounded-2xl border-2 border-pink-100 outline-none focus:border-pink-400"
              placeholder="e.g. Alex"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </section>

          <section>
            <label className="block text-pink-700 font-bold mb-4">Your Disabilities</label>
            <div className="flex flex-wrap gap-2">
              {DISABILITIES.map(d => (
                <button
                  key={d}
                  onClick={() => toggleItem(selectedDisabilities, setSelectedDisabilities, d)}
                  className={`px-4 py-2 rounded-full border-2 transition-all font-bold text-sm ${selectedDisabilities.includes(d as Disability) ? 'bg-pink-500 border-pink-500 text-white shadow-md scale-105' : 'bg-white border-pink-100 text-pink-300'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="block text-pink-700 font-bold mb-4">Your Hobbies</label>
            <div className="flex flex-wrap gap-2">
              {HOBBIES.map(h => (
                <button
                  key={h}
                  onClick={() => toggleItem(selectedHobbies, setSelectedHobbies, h)}
                  className={`px-4 py-2 rounded-full border-2 transition-all font-bold text-sm ${selectedHobbies.includes(h) ? 'bg-hotPink border-hotPink text-white shadow-md' : 'bg-white border-pink-100 text-pink-300'}`}
                >
                  {h}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="block text-pink-700 font-bold mb-2">Favorite Media (Movies, Books, etc.)</label>
            <input 
              className="w-full p-4 rounded-2xl border-2 border-pink-100 outline-none focus:border-pink-400"
              placeholder="Separate with commas, e.g. Harry Potter, The Matrix"
              value={favoriteMedia}
              onChange={(e) => setFavoriteMedia(e.target.value)}
            />
          </section>

          <section>
            <label className="block text-pink-700 font-bold mb-2">Matching Preferences</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase">Distance</p>
                <div className="flex gap-2">
                  <button onClick={() => setLocation('local')} className={`flex-1 p-2 rounded-xl border-2 font-bold ${location === 'local' ? 'bg-pink-100 border-pink-500' : 'bg-white'}`}>Local</button>
                  <button onClick={() => setLocation('global')} className={`flex-1 p-2 rounded-xl border-2 font-bold ${location === 'global' ? 'bg-pink-100 border-pink-500' : 'bg-white'}`}>Global</button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase">Community</p>
                <select 
                  className="w-full p-2 rounded-xl border-2 border-pink-100"
                  value={matchPref}
                  onChange={(e) => setMatchPref(e.target.value as any)}
                >
                  <option value="same">Same Disability</option>
                  <option value="different">Different Disability</option>
                  <option value="both">Open to Both</option>
                </select>
              </div>
            </div>
          </section>

          <div className="flex justify-center pt-8">
            <HeartButton size="lg" onClick={handleFinish}>
              Find Love
            </HeartButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingView;
