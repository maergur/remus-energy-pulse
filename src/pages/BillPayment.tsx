
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, CheckCircle, Calendar, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEnergy } from '../contexts/EnergyContext';
import { toast } from '@/hooks/use-toast';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';

const BillPayment: React.FC = () => {
  const navigate = useNavigate();
  const { energyData } = useEnergy();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { t, i18n } = useTranslation();

  const locale = i18n.language?.startsWith('tr') ? 'tr-TR' : 'en-US';
  const formatMonthYear = (date: Date | string) => new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long' }).format(typeof date === 'string' ? new Date(date) : date);
  const formatDate = (date: Date | string) => new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(typeof date === 'string' ? new Date(date) : date);
  const getPreviousMonth = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : new Date(date.getTime());
    d.setMonth(d.getMonth() - 1);
    return d;
  };

  const currentBill = {
    amount: 156.75,
    dueDate: '2024-01-15',
    usage: 65.3,
    period: '2023-12-01',
    status: 'unpaid'
  } as const;

  const prev1 = getPreviousMonth(currentBill.period);
  const prev2 = getPreviousMonth(prev1);
  const prev3 = getPreviousMonth(prev2);

  const previousBills = [
    { month: formatMonthYear(prev1), amount: 142.30, usage: 58.7, status: 'paid' },
    { month: formatMonthYear(prev2), amount: 165.80, usage: 71.2, status: 'paid' },
    { month: formatMonthYear(prev3), amount: 138.45, usage: 56.8, status: 'paid' },
  ];

  const handlePayBill = () => {
    setPaymentSuccess(true);
    toast({
      title: t('bill.paymentSuccessTitle'),
      description: t('bill.paymentSuccessDesc'),
    });
    
    setTimeout(() => setPaymentSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-20">
      <Header title={t('bill.title')} subtitle={t('bill.subtitle')} />

      <div className="p-4 space-y-6">
        {/* Current Bill */}
        <Card className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t('bill.currentBill')}</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-red-600">{t('bill.unpaid')}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {currentBill.amount} TL
                </div>
                <div className="text-gray-600">{formatMonthYear(currentBill.period)}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {t('bill.kwhConsumed', { value: currentBill.usage })}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">{t('bill.dueDate')}</span>
                  <span className="font-semibold text-gray-900 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(currentBill.dueDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('bill.usagePeriod')}</span>
                  <span className="font-semibold text-gray-900">{formatMonthYear(currentBill.period)}</span>
                </div>
              </div>

              {paymentSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-bold text-green-800 mb-1">{t('bill.paymentSuccessTitle')}</h3>
                  <p className="text-green-600 text-sm">{t('bill.paymentSuccessDesc')}</p>
                </div>
              ) : (
                <Button 
                  onClick={handlePayBill}
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl h-14 text-lg font-semibold"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {t('bill.payAmount', { amount: currentBill.amount })}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Usage Breakdown */}
        <Card className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle>{t('bill.usageBreakdown')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('bill.baseRate')}</span>
                <span className="font-semibold">89.50 TL</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('bill.peakHours')}</span>
                <span className="font-semibold">45.25 TL</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('bill.offPeak')}</span>
                <span className="font-semibold">18.00 TL</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('bill.taxesFees')}</span>
                <span className="font-semibold">4.00 TL</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex items-center justify-between font-bold text-lg">
                  <span>{t('bill.total')}</span>
                  <span>{currentBill.amount} TL</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Previous Bills */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('bill.paymentHistory')}</h2>
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
                        <span className="text-xs text-green-600 font-medium">{t('bill.paid')}</span>
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
