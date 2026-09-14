import { useNavigate, useParams } from "react-router-dom";
import "./AddEditProduct.css";
import { useForm } from "react-hook-form";
import { uploadImage } from "../api/cloudinary";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { createProduct } from "../features/product/productThunk";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/spinloader/LoadingSpinner";
import { useState } from "react";

interface SellProductFormInterface{
    title: string;
    description: string;
    price: number;
    category: string;
    image: FileList;
}

export default function AddEditProduct() {

    const navigate=useNavigate()
    const {register,handleSubmit,formState:{errors}}=useForm<SellProductFormInterface>()
    const dispatch=useAppDispatch();
    const {error}=useAppSelector(state=>state.product)

    const {id}=useParams<{id:string}>()

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    let [isUploading,setIsUploading]=useState<boolean>(false)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        setImagePreview(null);
        return;
      }

      const previewUrl = URL.createObjectURL(file);

      setImagePreview(previewUrl);
    };

    const handleAddEditProduct=async (data:SellProductFormInterface)=>{
        try{
            setIsUploading(true)
            const file=data.image[0];

            const imageUrl=await uploadImage(file);
            console.log(imageUrl)

            const result=await dispatch(createProduct({
              title:data.title,
              description:data.description,
              price:data.price,
              category:data.category,
              imageUrl
            }))

            if(createProduct.fulfilled.match(result)){
              toast.success('Advertisement Added Successfully');
              navigate('/sell')
            }

        }catch(error){
          if(error instanceof Error){
            toast.error(error.message)
          }
        }finally{
          setIsUploading(false)
        }
    }

    if(error){
      toast.error(error)
    }

  return (
    <div className="sell-page-wrapper">
      {isUploading && (
        <LoadingSpinner
          fullScreen
          size="medium"
        />
      )}
      <div className="sell-container">
        {/* Navigation / Top bar */}
        <div className="sell-top-nav">
          <button type="button" className="back-btn">
            <svg
              className="back-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span onClick={()=>navigate(-1)} >Back to listings</span>
          </button>
        </div>

        {/* Header */}
        <div className="sell-page-header">
          <h1 className="page-heading">Post Your Advertisement</h1>
          <p className="page-subheading">
            Enter the details below to publish your listing across the marketplace.
          </p>
        </div>

        {/* 2-Column Form Body */}
        <form className="sell-form-layout">
          {/* Left Column: Text & Pricing Info */}
          <div className="form-left-col">
            <div className="form-group">
              <label className="form-label" htmlFor="product-title">
                Ad Title
              </label>
              <input
                id="product-title"
                type="text"
                className="form-input"
                placeholder="e.g. Apple MacBook Air M1 256GB Space Grey"
                {...register('title',{
                    required:'Title Is Required',
                    minLength:{value:3,message:'At Least 3 character are required'}
                })}
              />
              <span className="field-hint">A clear title helps buyers find your listing faster.</span>
              {errors.title && <p style={{ color: "red",margin:0 }}>{errors.title.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="product-desc">
                Description
              </label>
              <textarea
                id="product-desc"
                className="form-textarea"
                rows={6}
                placeholder="Mention condition, bill availability, included accessories, or warranty..."
                {...register('description',{
                    required:'description Is Required',
                    minLength:{value:15,message:'At Least 15 character are required'}
                })}
              />
              {errors.description && <p style={{ color: "red",margin:0 }}>{errors.description.message}</p>}
            </div>

            <div className="form-row-split">
              <div className="form-group">
                <label className="form-label" htmlFor="product-price">
                  Set Price
                </label>
                <div className="price-input-wrapper">
                  <span className="currency-prefix">₹</span>
                  <input
                    id="product-price"
                    type="number"
                    className="form-input price-field"
                    placeholder="0"
                    {...register('price',{
                    required:'price Is Required',
                    min:{value:10,message:'At Least 2 digit number is required'}
                })}
                  />
                </div>
                  {errors.price && <p style={{ color: "red",margin:0 }}>{errors.price.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="product-cat">
                  Category
                </label>
                <select id="product-cat" className="form-select" defaultValue="electronics" {...register('category')}>
                  <option value="electronics">Electronics & Appliances</option>
                  <option value="mobiles">Mobile Phones</option>
                  <option value="cars">Cars & Vehicles</option>
                  <option value="bikes">Motorcycles & Scooters</option>
                  <option value="furniture">Home & Furniture</option>
                  <option value="fashion">Fashion & Lifestyle</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Image Dropzone & Submit Action */}
          <div className="form-right-col">
            <div className="form-group">
              <label className="form-label">Upload Product Photo</label>
              <label className="image-upload-box">

                <input
                  type="file"
                  accept="image/*"
                  className="hidden-file-input"
                  {...register("image", {
                    required: "Image is Required",
                    onChange: handleImageChange,
                  })}
                />

                {imagePreview ? (
                  <div className="image-preview-container">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="image-preview"
                    />

                    <div className="image-preview-overlay">
                      <span>Change Photo</span>
                    </div>
                  </div>
                ) : (
                  <div className="upload-box-content">

                    <div className="upload-icon-wrapper">
                      <svg
                        className="camera-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>

                    <span className="upload-primary-text">
                      Add Cover Photo
                    </span>

                    <span className="upload-secondary-text">
                      Click or drag & drop
                    </span>

                    <span className="upload-file-types">
                      Supports JPG, PNG, WEBP up to 5MB
                    </span>

                  </div>
                )}

              </label>
              {errors.image && <p style={{ color: "red",margin:0 }}>{errors.image.message}</p>}
            </div>

            <div className="publish-panel">
              <div className="security-notice">
                <svg
                  className="shield-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Your listing goes live instantly across buyers in your region.</span>
              </div>

              <button type="button" className="publish-btn" onClick={handleSubmit(handleAddEditProduct)} >
                Post Advertisement
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}