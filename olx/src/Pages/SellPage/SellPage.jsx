import React, { useEffect, useState } from 'react';
import './SellPage.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../../ProductContext';
// userContext
import { useUser } from '../../UserProvider'; 

// firestore and storage
import { db,storage,addDoc,collection } from '../../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const SellPage = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    subcategory: '',
    price: '',
    location: '',
    contact: ''
  });
  const [image,setImage] = useState(null)
  const [progress, setProgress] = useState(0);
  const [submitting,setSubmitting] = useState(true);
  const [isError,setIsError] = useState(true);
  const [isSumbmitButton,setIsSubmitButton] = useState(true);
  // context
  const {user} = useUser()
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name] : value,
    });
  };

// validateForm
const validateForm = () => {
  let formErrors = {};
  
  // Example of validating name and price fields
  if (!formData.productName) {
    formErrors.productName = "Product name is required";
  }

  if (!formData.description) {
    formErrors.description = "Description is required";
  }

  if (!formData.subcategory) {
    formErrors.subcategory = "Subcategory is required";
  }
  
  if (!formData.price) {
    formErrors.price = "Price is required";
  } else if (isNaN(formData.price)) {
    formErrors.price = "Price must be a number";
  }

  if (!formData.location) {
    formErrors.location = "Location is required";
  }

  if (!formData.contact) {
    formErrors.contact = "Contact details are required";
  }

  if (!image) {
    formErrors.image = "Product image is required";
  }
console.log("vlaiding work")
  return formErrors;
};

  const handleSubmit = (e) => {
    e.preventDefault();

    // validating form
    const validationErrors = validateForm();

    if(Object.keys(validationErrors).length>0)
    {
      console.log("woriking")
      setIsSubmitButton(false);
      setIsError(validateForm);
      return;
    }
    
    
    setIsSubmitButton(true);
    setSubmitting(true);
    console.log('Form submitted', formData);
    if (image) {
      const storageRef = ref(storage, `products/${image.name}`); // Create a storage reference
      const uploadTask = uploadBytesResumable(storageRef, image); // Upload the image

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Track upload progress
          const progressBar = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressBar);
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // Handle any errors during the upload
          console.error("Error uploading image: ", error);
        },
        () => {
          // Upload completed successfully, now get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);

            // Save form data and image URL in Firestore
            addDoc(collection(db, 'products'), {
              userId:user.uid,
              userName:user.displayName,
              ...formData,
              imageUrl: downloadURL,
              createdAt: new Date().toDateString(),
              sellerImg:user.photoURL,
            })
            .then(() => {
              console.log("Product added successfully!");
              navigate('/'); // Redirect user after successful submission
            })
            .catch((error) => {
              console.error("Error adding product: ", error);
            });
          });
        }
      );
    } else {
      console.error("No image selected");
    }
  };

useEffect(()=>{
 return ()=>{
  setSubmitting(false);
 } 
},[])

useEffect(()=>{
  if(Object.keys(validateForm()).length===0)
    {
      setIsSubmitButton(true);
    } 
})

  return (
    <div className="sell-form mx-auto absoulte overflow-hidden h-[100%]">
      <span onClick={()=>navigate(-1)}>back</span>
      <h2 className='font-semibold text-2xl'>Sell Your Product</h2>
      <form className='flex gap-20' onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className='flex-1'>
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />
       {isError.productName && <p>{isError.productName}</p>}
        {/* Description */}
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your product"
          required
        />
       {isError.description && <p>{isError.description}</p>}
        {/* Subcategory */}
        <label htmlFor="subcategory">Subcategory</label>
        <select
          id="subcategory"
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          required
        >
          <option value="">Select subcategory</option>
          <option value="Cars">Cars</option>
          <option value="Properties">Properties</option>
          <option value="Mobile">Mobile</option>
          <option value="Bikes">Bikes</option>
          <option value="Jobs">Jobs</option>
          <option value="Fashions">Fashions</option>
          <option value="Pets">Pets</option>
          <option value="Accessories">Accessories</option>
          <option value="Laptop/pc">Laptop/pc</option>
          <option value="Services">Services</option>
          <option value="Sports">Sports</option>
          <option value="Others">Others</option>
        </select>

        {isError.subcategory && <p>{isError.subcategory}</p>}


        {/* Price */}
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          required
        />
           {isError.price && <p>{isError.price}</p>}


        {/* Location */}
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter location"
          required
        />
        {isError.location && <p>{isError.location}</p>}


        {/* Contact Details */}
        <label htmlFor="contact">Contact Details</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Enter your contact number"
          required
        />

        {isError.contact && <p>{isError.contact}</p>}


        </div>
        <div className='flex-1'>
        <img className='' src={image?URL.createObjectURL(image):""} alt="" />

        <label class="custom-file-label" for="file-input">Choose a file</label>
        <input id="file-input" className='file-input' onChange={(e)=>setImage(e.target.files[0])} accept="image/*" type="file" />
        <span class="file-name" id="file-name">{image?image.name:"No file chosen"}</span>
        {submitting?<progress className='block w-[100%] h-6' id="file" value={progress} max="100"> {progress} </progress>:null}
        {/* <progress className== block w-[100%] h-6' id="file" value={10} max="100"> {progress} </progress> */}
        
        {/* Submit Button */}
        {isSumbmitButton ? <button onClick={handleSubmit} className='mt-5' type="submit">Submit</button>:<p>Fill all the field</p>}
        </div>
      </form>
    </div>
  );
};

export default SellPage;
