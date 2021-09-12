import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createLogEntry } from './api';

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createLogEntry(data);
      onClose();
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
      {error && <h3>{error}</h3>}
      <label htmlFor="title">Title</label>
      <input name="title" required {...register('title')} />

      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={3} {...register('comments')}></textarea>

      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        rows={3}
        {...register('description')}
      ></textarea>

      <label htmlFor="image">Image</label>
      <input name="image" {...register('image')} />

      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required {...register('visitDate')} />

      <button className="error" disabled={loading}>
        {loading ? 'Loading...' : 'Create Entry'}
      </button>
    </form>
  );
};

export default LogEntryForm;
