// import React, { useState } from 'react';

// const CreateSocialLinks = ({ onSave }) => {
//   const [socialMediaLinks, setSocialMediaLinks] = useState([
//     { platform: '', link: '' },
//   ]);

//   const handleChange = (event, index) => {
//     const { name, value } = event.target;
//     const updatedLinks = [...socialMediaLinks];
//     updatedLinks[index][name] = value;
//     setSocialMediaLinks(updatedLinks);
//   };

//   const handleAddLink = () => {
//     setSocialMediaLinks([...socialMediaLinks, { platform: '', link: '' }]);
//   };

//   const handleRemoveLink = (index) => {
//     const updatedLinks = [...socialMediaLinks];
//     updatedLinks.splice(index, 1);
//     setSocialMediaLinks(updatedLinks);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onSave(socialMediaLinks);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {socialMediaLinks.map((link, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             name="platform"
//             value={link.platform}comp
//             placeholder="Social Media Platform"
//             onChange={(event) => handleChange(event, index)}
//           />
//           <input
//             type="text"
//             name="link"
//             value={link.link}
//             placeholder="Social Media Link"
//             onChange={(event) => handleChange(event, index)}
//           />
//           <button type="button" onClick={() => handleRemoveLink(index)}>
//             Remove
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={handleAddLink}>
//         Add Social Media Link
//       </button>
//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default CreateSocialLinks;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateSocialLinks = ({ onSave }) => {
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  const [link, setLink] = useState({
    social_media_platform: "",
    social_media_link: "",
  });

  const handleChange = (e) => {
    // const { name, value } = event.target;
    // const updatedLinks = [...socialMediaLinks];
    // updatedLinks[index][name] = value;
    // setSocialMediaLinks(updatedLinks);
    setLink((previous) => ({ ...previous, [e.target.name]: e.target.value }));
  };

  const handleAddLink = () => {
    setSocialMediaLinks([...socialMediaLinks, link]);
    setLink({ social_media_platform: "", social_media_link: "" });
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
    <div className="edit-social-links">
      <>
        {console.log("links", socialMediaLinks)}

        <>
          {!!socialMediaLinks.length &&
            socialMediaLinks.map((link) => {
              return (
                <div>
                  <Link to={link.social_media_link}>
                    {link.social_media_platform}
                  </Link>
                </div>
              );
            })}
        </>

        <form onSubmit={handleSubmit}>
          <button type="button" onClick={(index) => handleRemoveLink(index)}>
            Remove
          </button>
          <div>
            <input
              type="text"
              name="social_media_platform"
              value={link.social_media_platform}
              placeholder="Social Media Platform"
              onChange={(event) => handleChange(event)}
            />
            <input
              type="text"
              name="social_media_link"
              value={link.social_media_link}
              placeholder="Social Media Link"
              onChange={(event) => handleChange(event)}
            />
          </div>
          <button type="button" onClick={handleAddLink}>
            Add Social Media Link
          </button>
          <button type="submit">Save Social Media Links</button>
        </form>
      </>
    </div>
  );
};

export default CreateSocialLinks;
