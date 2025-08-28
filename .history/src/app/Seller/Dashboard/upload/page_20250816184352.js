'use client';
import { useState } from 'react';

const UploadProduct = () => {
  const [shoe, setShoe] = useState({
    name: '',
    price: '',
    discount: '',
    description: '',
    brand: '',
    category: '',
    variants: [
      {
        color: '',
        img: '',
        sizeStock: [{ size: '', stock: '' }]
      }
    ]
  });

  // Basic input field change handler
  function handleInputChange(e) {
    const { name, value } = e.target;
    setShoe(prev => ({ ...prev, [name]: value }));
  }

  // Change color or img (text) in a variant
  function handleVariantChange(e, index, field) {
    const value = e.target.value;
    const updatedVariants = [...shoe.variants];
    updatedVariants[index][field] = value;
    setShoe(prev => ({ ...prev, variants: updatedVariants }));
  }

  // Change size or stock in sizeStock
  function handleSizeStockChange(e, variantIndex, stockIndex, field) {
    const value = e.target.value;
    const updatedVariants = [...shoe.variants];
    updatedVariants[variantIndex].sizeStock[stockIndex][field] = value;
    setShoe(prev => ({ ...prev, variants: updatedVariants }));
  }

  // Upload image to Cloudinary and set img URL in variant
  async function uploadToCloudinary(file, index) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'steprush');
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if(!cloudName){
      alert("something missing")
    }

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (!data.secure_url) {
      alert("Image upload failed");
      return;
    }

    const updatedVariants = [...shoe.variants];
    updatedVariants[index].img = data.secure_url;
    setShoe(prev => ({ ...prev, variants: updatedVariants }));
  }

  // Add new variant
  function addVariant() {
    setShoe(prev => ({
      ...prev,
      variants: [...prev.variants, { color: '', img: '', sizeStock: [{ size: '', stock: '' }] }]
    }));
  }

  // Delete variant
  function deleteVariant(index) {
    const updatedVariants = [...shoe.variants];
    updatedVariants.splice(index, 1);
    setShoe(prev => ({ ...prev, variants: updatedVariants }));
  }

  // Add size-stock to variant
  function addSizeStock(index) {
    const updatedVariants = [...shoe.variants];
    updatedVariants[index].sizeStock.push({ size: '', stock: '' });
    setShoe(prev => ({ ...prev, variants: updatedVariants }));
  }

  // Delete size-stock entry
  function deleteSizeStock(variantIndex, stockIndex) {
    const updatedVariants = [...shoe.variants];
    updatedVariants[variantIndex].sizeStock.splice(stockIndex, 1);
    setShoe(prev => ({ ...prev, variants: updatedVariants }));
  }


  
  async function handledatasend() {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch('/api/seller/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // ✅ Fix typo: "Beared" → "Bearer"
      },
      body: JSON.stringify(shoe) // ✅ Send data
    });

    const result = await res.json();
    if (!res.ok) {
      alert(result.message || "Failed to upload");
      return;
    }

    alert("Product uploaded successfully!");
  } catch (err) {
    console.error(err);
    alert("Something went wrong while uploading the product");
  }
}

  console.log(shoe)

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-red-500 border-b border-red-500 pb-2">Upload Shoe Product</h1>

        <input name="name" value={shoe.name} onChange={handleInputChange} placeholder="Shoe Name"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600" />
        <input name="description" value={shoe.description} onChange={handleInputChange} placeholder="Description"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600" />
        <input name="price" value={shoe.price} onChange={handleInputChange} placeholder="Price" type="number"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600" />
        <input name="discount" value={shoe.discount} onChange={handleInputChange} placeholder="Discount" type="number"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600" />
        <input name="brand" value={shoe.brand} onChange={handleInputChange} placeholder="Brand"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600" />
        <select
  name="category"
  value={shoe.category}
  onChange={handleInputChange}
  className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
>
  <option value="">Select Category</option>
  <option value="Casuals">Casuals</option>
  <option value="formals">Formal</option>
  <option value="sneakers">Sneakers</option>
  <option value="sports">Sports</option>
</select>

        {/* Variants */}
        {shoe.variants.map((variant, i) => (
          <div key={i} className="border border-gray-700 p-4 rounded-lg space-y-4 mt-6 bg-gray-900">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-red-400">Variant {i + 1}</h2>
              {i > 0 && (
                <button onClick={() => deleteVariant(i)} className="text-red-500 font-bold hover:underline">
                  ❌ Delete Variant
                </button>
              )}
            </div>

            <input value={variant.color} onChange={(e) => handleVariantChange(e, i, 'color')} placeholder="Color"
              className="w-full p-3 rounded bg-gray-800 border border-gray-600" />

            <input type="file" accept="image/*"
              onChange={(e) => uploadToCloudinary(e.target.files[0], i)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600" />

            {/* Size and Stock */}
            <div className="space-y-2">
              <h3 className="text-lg text-gray-300">Size & Stock</h3>
              {variant.sizeStock.map((ss, j) => (
                <div key={j} className="flex space-x-4 items-center">
                  <input value={ss.size} onChange={(e) => handleSizeStockChange(e, i, j, 'size')} placeholder="Size"
                    className="w-1/2 p-2 rounded bg-gray-800 border border-gray-600" />
                  <input type="number" value={ss.stock} onChange={(e) => handleSizeStockChange(e, i, j, 'stock')}
                    placeholder="Stock" className="w-1/2 p-2 rounded bg-gray-800 border border-gray-600" />
                  {j > 0 && (
                    <button onClick={() => deleteSizeStock(i, j)}
                      className="text-red-500 font-bold hover:underline ml-2">
                      ❌
                    </button>
                  )}
                </div>
              ))}
              <button onClick={() => addSizeStock(i)}
                className="mt-2 bg-green-600 px-4 py-2 rounded hover:bg-green-700">
                + Add Size & Stock
              </button>
            </div>
          </div>
        ))}

        <button onClick={addVariant}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white mt-6">
          + Add Variant
        </button>

        <button onClick={handledatasend} className="w-full mt-8 bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-bold">
          Upload Product
        </button>
      </div>
    </div>
  );
};

export default UploadProduct;
