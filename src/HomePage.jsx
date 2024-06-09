import React, { useState , useEffect} from 'react';


const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [website, setWebsite] = useState('');
  const [savedDetails, setSavedDetails] = useState([]);

  useEffect(() => {
    const storedDetails = JSON.parse(localStorage.getItem('savedDetails'));
    if (storedDetails) {
      setSavedDetails(storedDetails);
    }
  }, []);

  const handleNew = () => {
    setUsername('');
    setPassword('');
    setWebsite('');
  };

  const handleSave = () => {
    const newDetail = { username, password, website };
    const newSavedDetails = [...savedDetails, newDetail];
    setSavedDetails(newSavedDetails);
    localStorage.setItem('savedDetails', JSON.stringify(newSavedDetails));
    handleNew(); // Clear the form fields after saving
  };

  const handleDelete = (index) => {
    const newSavedDetails = savedDetails.filter((_, i) => i !== index);
    setSavedDetails(newSavedDetails);
    localStorage.setItem('savedDetails', JSON.stringify(newSavedDetails));
  };

  return (
    <div className="container flex justify-center items-center flex-col min-h-screen min-w-full">
      <div className="form-container flex flex-col min-w-[30%]">
        <h2>Password Manager</h2>
        <textarea
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Website URL"
        />
        <textarea
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <textarea
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="button-container mt-4">
          <button onClick={handleNew}>New</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>

      <div className="saved-details-container w-screen flex flex-col">
        {savedDetails.map((detail, index) => (
          <div key={index} className="saved-detail w-[80%] flex flex-col gap-10 justify-between p-8 m-10 md:flex-row">
            <p><strong>Username:</strong> {detail.username}</p>
            <p><strong>Password:</strong> {detail.password}</p>
            <p><strong>Website:</strong> {detail.website}</p>
            <button className='bg-red-500' onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
