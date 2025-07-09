
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, CheckCircle, Calendar, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEnergy } from '../contexts/EnergyContext';
import { toast } from '@/hooks/use-toast';

const BillPayment: React.FC = () => {
  const navigate = useNavigate();
  const { energyData } = useEnergy();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const currentBill = {
    amount: 156.75,
    dueDate: '2024-01-15',
    usage: 65.3,
    period: 'December 2023',
    status: 'unpaid'
  };

  const previousBills = [
    { month: 'November 2023', amount: 142.30, usage: 58.7, status: 'paid' },
    { month: 'October 2023', amount: 165.80, usage: 71.2, status: 'paid' },
    { month: 'September 2023', amount: 138.45, usage: 56.8, status: 'paid' },
  ];

  const handlePayBill = () => {
    setPaymentSuccess(true);
    toast({
      title: "Payment Successful!",
      description: `Bill of ${currentBill.amount} TL has been paid`,
    });
    
    setTimeout(() => setPaymentSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="mr-3 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Bills & Payment</h1>
            <p className="text-sm text-gray-500">Manage your electricity bills</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Bill */}
        <Card className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Bill</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-red-600">Unpaid</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {currentBill.amount} TL
                </div>
                <div className="text-gray-600">{currentBill.period}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {currentBill.usage} kWh consumed
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Due Date</span>
                  <span className="font-semibold text-gray-900 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {currentBill.dueDate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Usage Period</span>
                  <span className="font-semibold text-gray-900">{currentBill.period}</span>
                </div>
              </div>

              {paymentSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-bold text-green-800 mb-1">Payment Successful!</h3>
                  <p className="text-green-600 text-sm">Your bill has been paid successfully</p>
                </div>
              ) : (
                <Button 
                  onClick={handlePayBill}
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl h-14 text-lg font-semibold"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay {currentBill.amount} TL
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Usage Breakdown */}
        <Card className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle>Usage Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Base Rate</span>
                <span className="font-semibold">89.50 TL</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Peak Hours (25.3 kWh)</span>
                <span className="font-semibold">45.25 TL</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Off-Peak (40.0 kWh)</span>
                <span className="font-semibold">18.00 TL</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Taxes & Fees</span>
                <span className="font-semibold">4.00 TL</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex items-center justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{currentBill.amount} TL</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Previous Bills */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Payment History</h2>
          <div className="space-y-3">
            {previousBills.map((bill, index) => (
              <Card key={index} className="bg-white shadow-sm rounded-2xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{bill.month}</h3>
                      <p className="text-sm text-gray-600">{bill.usage} kWh</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{bill.amount} TL</div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">Paid</span>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPayment;
