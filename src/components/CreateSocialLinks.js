import React, { useState } from 'react';

const CreateSocialLinks = ({ onSave }) => {
  const [socialMediaLinks, setSocialMediaLinks] = useState([
    { social_media_platform: '', social_media_link: '' },
  ]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedLinks = [...socialMediaLinks];
    updatedLinks[index][name] = value;
    setSocialMediaLinks(updatedLinks);
  };

  const handleAddLink = () => {
    setSocialMediaLinks([...socialMediaLinks, { social_media_platform: '', social_media_link: '' }]);
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...socialMediaLinks];
    updatedLinks.splice(index, 1);
    setSocialMediaLinks(updatedLinks);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(socialMediaLinks);
  };

  return (
    <form onSubmit={handleSubmit}>
      {socialMediaLinks.map((social_media_link, index) => (
        <div key={index}>
          <input
            type="text"
            name="social_media_platform"
            value={social_media_link.social_media_platform}
            placeholder="Social Media Platform"
            onChange={(event) => handleChange(event, index)}
          />
          <input
            type="text"
            name="social_media_link"
            value={social_media_link.social_media_link}
            placeholder="Social Media Link"
            onChange={(event) => handleChange(event, index)}
          />
          <button type="button" onClick={() => handleRemoveLink(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddLink}>
        Add Social Media Link
      </button>
      <button type="submit">Save</button>
    </form>
  );
};

export default CreateSocialLinks;