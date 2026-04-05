import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Upload, FileArrowUp, X, CheckCircle, WarningCircle } from '@phosphor-icons/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { parseCSV, parseBankStatement, validateImport } from '../utils/import';

const BulkUploadModal = ({ open, onOpenChange }) => {
  const { bulkAddTransactions, theme } = useApp();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [validation, setValidation] = useState(null);
  const [uploadType, setUploadType] = useState('standard'); // standard or bank

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      alert('Please upload a CSV file');
      return;
    }

    setFile(selectedFile);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvText = event.target.result;
      
      let parsed;
      if (uploadType === 'bank') {
        parsed = parseBankStatement(csvText);
      } else {
        parsed = parseCSV(csvText);
      }
      
      const validation = validateImport(parsed);
      setValidation(validation);
      setPreview(parsed.slice(0, 5)); // Show first 5 for preview
    };
    
    reader.readAsText(selectedFile);
  };

  const handleUpload = () => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvText = event.target.result;
      
      let parsed;
      if (uploadType === 'bank') {
        parsed = parseBankStatement(csvText);
      } else {
        parsed = parseCSV(csvText);
      }
      
      const validation = validateImport(parsed);
      
      if (validation.isValid) {
        bulkAddTransactions(parsed);
        onOpenChange(false);
        setFile(null);
        setPreview([]);
        setValidation(null);
      }
    };
    
    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const template = 'Date,Description,Category,Type,Amount,Notes\\n2024-01-01,Grocery Shopping,Food & Dining,expense,125.50,Weekly groceries\\n2024-01-02,Salary,Salary,income,5000.00,Monthly salary';
    
    const blob = new Blob([template], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'finsight_import_template.csv';
    link.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`glass-panel ${
        theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
      } sm:max-w-[600px]`} data-testid="bulk-upload-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light tracking-tight flex items-center gap-2">
            <Upload size={24} />
            Bulk Upload Transactions
          </DialogTitle>
          <DialogDescription>
            Import multiple transactions from CSV file
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Type Selection */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={uploadType === 'standard' ? 'default' : 'outline'}
              onClick={() => setUploadType('standard')}
              className={`flex-1 rounded-full ${
                uploadType === 'standard'
                  ? theme === 'dark'
                    ? 'bg-indigo-500/20 text-indigo-300'
                    : 'bg-indigo-600/20 text-indigo-700'
                  : ''
              }`}
            >
              Standard Format
            </Button>
            <Button
              type="button"
              variant={uploadType === 'bank' ? 'default' : 'outline'}
              onClick={() => setUploadType('bank')}
              className={`flex-1 rounded-full ${
                uploadType === 'bank'
                  ? theme === 'dark'
                    ? 'bg-indigo-500/20 text-indigo-300'
                    : 'bg-indigo-600/20 text-indigo-700'
                  : ''
              }`}
            >
              Bank Statement
            </Button>
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center ${
              theme === 'dark'
                ? 'border-white/20 bg-white/5'
                : 'border-slate-900/20 bg-slate-900/5'
            }`}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <FileArrowUp size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">
                {file ? file.name : 'Click to upload CSV file'}
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {uploadType === 'standard' 
                  ? 'Format: Date, Description, Category, Type, Amount'
                  : 'Format: Date, Description, Debit, Credit, Balance'}
              </p>
            </label>
          </div>

          {/* Download Template */}
          {uploadType === 'standard' && (
            <Button
              type="button"
              variant="ghost"
              onClick={downloadTemplate}
              className="w-full rounded-full"
            >
              Download CSV Template
            </Button>
          )}

          {/* Validation Messages */}
          {validation && (
            <div className="space-y-2">
              {validation.errors.length > 0 && (
                <div className={`p-4 rounded-xl ${
                  theme === 'dark' ? 'bg-rose-500/20' : 'bg-rose-600/20'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <WarningCircle size={20} className="text-rose-400" />
                    <span className="font-medium text-rose-400">Errors Found</span>
                  </div>
                  {validation.errors.map((error, i) => (
                    <p key={i} className="text-sm">{error}</p>
                  ))}
                </div>
              )}
              
              {validation.warnings.length > 0 && (
                <div className={`p-4 rounded-xl ${
                  theme === 'dark' ? 'bg-yellow-500/20' : 'bg-yellow-600/20'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <WarningCircle size={20} className="text-yellow-400" />
                    <span className="font-medium text-yellow-400">Warnings</span>
                  </div>
                  {validation.warnings.slice(0, 3).map((warning, i) => (
                    <p key={i} className="text-sm">{warning}</p>
                  ))}
                  {validation.warnings.length > 3 && (
                    <p className="text-sm mt-1">...and {validation.warnings.length - 3} more</p>
                  )}
                </div>
              )}
              
              {validation.isValid && (
                <div className={`p-4 rounded-xl ${
                  theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-600/20'
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-emerald-400" />
                    <span className="font-medium text-emerald-400">
                      Ready to import {preview.length} transactions
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Preview */}
          {preview.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Preview (first 5 rows):</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${
                      theme === 'dark' ? 'border-white/10' : 'border-slate-900/10'
                    }`}>
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Description</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-right p-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((t, i) => (
                      <tr key={i} className={`border-b ${
                        theme === 'dark' ? 'border-white/10' : 'border-slate-900/10'
                      }`}>
                        <td className="p-2">{t.date}</td>
                        <td className="p-2">{t.description}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            t.type === 'income'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {t.type}
                          </span>
                        </td>
                        <td className="p-2 text-right">${t.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                setFile(null);
                setPreview([]);
                setValidation(null);
              }}
              className={`flex-1 rounded-full ${
                theme === 'dark'
                  ? 'border-white/10 hover:bg-white/5'
                  : 'border-slate-900/10 hover:bg-slate-900/5'
              }`}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleUpload}
              disabled={!file || !validation?.isValid}
              className={`flex-1 rounded-full ${
                theme === 'dark'
                  ? 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300'
                  : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-700'
              }`}
            >
              Import Transactions
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkUploadModal;
