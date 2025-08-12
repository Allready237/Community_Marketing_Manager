import React, { useState } from 'react';
import { Send, RotateCcw, Sparkles, Edit3, ArrowLeft, Save } from 'lucide-react';
import ImageUpload from './ImageUpload';
import NotificationToast from './NotificationToast';

interface ImageData {
  file?: File;
  url?: string;
  preview: string;
}

interface FormData {
  productName: string;
  productPrice: string;
  image: ImageData | null;
}

interface CaptionData {
  french: string;
  english: string;
}

type WorkflowStage = 'input' | 'captions' | 'sending' | 'complete';

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    productPrice: '',
    image: null
  });
  const [captions, setCaptions] = useState<CaptionData>({
    french: '',
    english: ''
  });
  const [workflowStage, setWorkflowStage] = useState<WorkflowStage>('input');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [expandedCaption, setExpandedCaption] = useState<'french' | 'english' | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (imageData: ImageData | null) => {
    setFormData(prev => ({
      ...prev,
      image: imageData
    }));
  };

  const handleGenerateCaptions = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productName.trim() || !formData.productPrice.trim()) {
      setNotification({
        message: 'Please fill in all required fields',
        type: 'error'
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI caption generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate sample captions based on product data
      const sampleFrenchCaption = `🌟 Découvrez ${formData.productName} !

✨ Prix spécial : ${formData.productPrice} FCFA seulement !

🚀 Qualité premium garantie
💫 Livraison rapide disponible
🎯 Offre limitée - Ne manquez pas cette opportunité !

#${formData.productName.replace(/\s+/g, '')} #OffreSpeciale #QualitePremium`;

      const sampleEnglishCaption = `🌟 Introducing ${formData.productName}!

✨ Special price: Only ${formData.productPrice} FCFA!

🚀 Premium quality guaranteed
💫 Fast delivery available
🎯 Limited offer - Don't miss this opportunity!

#${formData.productName.replace(/\s+/g, '')} #SpecialOffer #PremiumQuality`;

      setCaptions({
        french: sampleFrenchCaption,
        english: sampleEnglishCaption
      });
      
      setWorkflowStage('captions');
      setNotification({
        message: 'Captions generated successfully! Review and edit as needed.',
        type: 'success'
      });
      
    } catch (error) {
      setNotification({
        message: 'Failed to generate captions. Please try again.',
        type: 'error'
      });
      setWorkflowStage('input');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendToGroups = async () => {
    setIsSending(true);
    
    try {
      // Simulate sending to WhatsApp groups
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      setNotification({
        message: 'Posts sent successfully to all WhatsApp groups! ✅',
        type: 'success'
      });
      
      setWorkflowStage('complete');
      
      // Auto-reset after success
      setTimeout(() => {
        handleClearForm();
      }, 2000);
      
    } catch (error) {
      setNotification({
        message: 'Failed to send posts. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      productName: '',
      productPrice: '',
      image: null
    });
    setCaptions({
      french: '',
      english: ''
    });
    setWorkflowStage('input');
  };

  const handleCaptionChange = (language: 'french' | 'english', value: string) => {
    setCaptions(prev => ({
      ...prev,
      [language]: value
    }));
  };

  const handleBackToForm = () => {
    setWorkflowStage('input');
    setExpandedCaption(null);
  };

  const toggleCaptionExpansion = (language: 'french' | 'english') => {
    setExpandedCaption(expandedCaption === language ? null : language);
  };

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    return numericValue;
  };

  const canGenerate = formData.productName.trim() && formData.productPrice.trim() && workflowStage === 'input';
  const canSend = workflowStage === 'captions' && captions.french.trim() && captions.english.trim() && !isSending;

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Create Marketing Post</h2>
            <p className="text-gray-300">Generate and send product content to WhatsApp groups</p>
          </div>

          {workflowStage === 'input' && (
            <form onSubmit={handleGenerateCaptions} className="space-y-6">
              <>
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-200 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="productName"
                  value={formData.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-base placeholder-gray-400"
                  placeholder="Enter product name..."
                  required
                />
              </div>

              <div>
                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-200 mb-2">
                  Product Price *
                </label>
                <div className="relative">
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base">FCFA</span>
                  <input
                    type="text"
                    id="productPrice"
                    value={formData.productPrice}
                    onChange={(e) => handleInputChange('productPrice', formatPrice(e.target.value))}
                    className="w-full px-4 pr-16 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-base placeholder-gray-400"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <ImageUpload
                onImageChange={handleImageChange}
                currentImage={formData.image}
              />

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  disabled={!canGenerate || isGenerating}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 flex items-center justify-center min-h-[48px]"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Captions
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleClearForm}
                  disabled={isGenerating}
                  className="flex-none bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 text-gray-200 font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 flex items-center justify-center min-h-[48px]"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear Form
                </button>
              </div>
              </>
            </form>
          )}

          {workflowStage === 'captions' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Generated Captions</h3>
                <p className="text-sm text-gray-300">Review and edit your captions before sending</p>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-600 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleCaptionExpansion('french')}
                    className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-left font-medium text-white flex items-center justify-between transition-colors"
                  >
                    <span>French Caption</span>
                    <Edit3 className="h-4 w-4 text-gray-300" />
                  </button>
                  {expandedCaption === 'french' ? (
                    <div className="p-4 border-t border-gray-600">
                      <textarea
                        value={captions.french}
                        onChange={(e) => handleCaptionChange('french', e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors resize-none text-sm placeholder-gray-400"
                      />
                      <div className="mt-2 text-xs text-gray-400">
                        {captions.french.length} characters
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border-t border-gray-600">
                      <p className="text-sm text-gray-300 line-clamp-3">
                        {captions.french}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border border-gray-600 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleCaptionExpansion('english')}
                    className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-left font-medium text-white flex items-center justify-between transition-colors"
                  >
                    <span>English Caption</span>
                    <Edit3 className="h-4 w-4 text-gray-300" />
                  </button>
                  {expandedCaption === 'english' ? (
                    <div className="p-4 border-t border-gray-600">
                      <textarea
                        value={captions.english}
                        onChange={(e) => handleCaptionChange('english', e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors resize-none text-sm placeholder-gray-400"
                      />
                      <div className="mt-2 text-xs text-gray-400">
                        {captions.english.length} characters
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border-t border-gray-600">
                      <p className="text-sm text-gray-300 line-clamp-3">
                        {captions.english}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSendToGroups}
                  disabled={!canSend}
                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 flex items-center justify-center min-h-[48px]"
                >
                  {isSending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending to Groups...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save and Send
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleBackToForm}
                  disabled={isSending}
                  className="flex-none bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 text-gray-200 font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 flex items-center justify-center min-h-[48px]"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Form
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {notification && (
        <NotificationToast
          message={notification.message}
          type={notification.type}
          onDismiss={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default ProductForm;