import React, { useState } from 'react';

const DreamCreator = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ title, description, targetDate, category });
  };

  return (
    <div>
      <h1>Dream Creator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Target Date</label>
          <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
        </div>
        <div>
          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <button type="submit">Create Dream</button>
      </form>

      <div>
        <h2>Milestones</h2>
        {/* Placeholder for milestones */}
      </div>

      <div>
        <h2>Tasks</h2>
        {/* Placeholder for tasks */}
      </div>
    </div>
  );
};

export default DreamCreator;
