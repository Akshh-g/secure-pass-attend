import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Fingerprint,
  Camera,
  CheckCircle,
  AlertTriangle,
  X,
  Shield,
  Eye,
  Scan
} from 'lucide-react';

interface BiometricVerificationProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const BiometricVerification = ({ onSuccess, onCancel }: BiometricVerificationProps) => {
  const [verificationMethod, setVerificationMethod] = useState<'fingerprint' | 'face' | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            setVerificationStatus('success');
            setTimeout(() => {
              onSuccess();
            }, 1500);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isScanning, onSuccess]);

  const startVerification = (method: 'fingerprint' | 'face') => {
    setVerificationMethod(method);
    setVerificationStatus('scanning');
    setIsScanning(true);
    setScanProgress(0);
  };

  const resetVerification = () => {
    setVerificationMethod(null);
    setVerificationStatus('idle');
    setIsScanning(false);
    setScanProgress(0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between">
            <div></div>
            <div className="bg-gradient-to-r from-primary to-blue-600 p-3 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCancel}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardTitle className="text-xl">Biometric Verification</CardTitle>
          <CardDescription>
            {verificationStatus === 'idle' && 'Choose your preferred verification method'}
            {verificationStatus === 'scanning' && `Scanning ${verificationMethod}...`}
            {verificationStatus === 'success' && 'Verification successful!'}
            {verificationStatus === 'failed' && 'Verification failed. Please try again.'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {verificationStatus === 'idle' && (
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-32 flex-col space-y-3 hover:bg-gradient-to-br hover:from-primary/5 hover:to-blue-50"
                onClick={() => startVerification('fingerprint')}
              >
                <Fingerprint className="h-12 w-12 text-primary" />
                <div className="text-center">
                  <p className="font-medium">Fingerprint</p>
                  <p className="text-xs text-muted-foreground">Touch sensor</p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-32 flex-col space-y-3 hover:bg-gradient-to-br hover:from-success/5 hover:to-green-50"
                onClick={() => startVerification('face')}
              >
                <Camera className="h-12 w-12 text-success" />
                <div className="text-center">
                  <p className="font-medium">Face Recognition</p>
                  <p className="text-xs text-muted-foreground">Look at camera</p>
                </div>
              </Button>
            </div>
          )}

          {verificationStatus === 'scanning' && (
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-primary/20 flex items-center justify-center bg-gradient-to-br from-primary/10 to-blue-50">
                  {verificationMethod === 'fingerprint' ? (
                    <Fingerprint className="h-16 w-16 text-primary animate-pulse" />
                  ) : (
                    <Eye className="h-16 w-16 text-success animate-pulse" />
                  )}
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Scan className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    {verificationMethod === 'fingerprint' ? 'Place finger on sensor' : 'Look directly at camera'}
                  </span>
                </div>
                <Progress value={scanProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">{scanProgress}% Complete</p>
              </div>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-success to-green-600 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-success">Verification Successful!</h3>
                <p className="text-sm text-muted-foreground">Attendance has been marked</p>
              </div>
            </div>
          )}

          {verificationStatus === 'failed' && (
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-destructive to-red-600 flex items-center justify-center">
                <AlertTriangle className="h-12 w-12 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-destructive">Verification Failed</h3>
                <p className="text-sm text-muted-foreground">
                  {verificationMethod === 'fingerprint' 
                    ? 'Fingerprint not recognized. Please clean your finger and try again.'
                    : 'Face not recognized. Please ensure good lighting and try again.'
                  }
                </p>
              </div>
              <Button onClick={resetVerification} variant="outline">
                Try Again
              </Button>
            </div>
          )}

          {verificationStatus === 'idle' && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">Secure & Encrypted</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your biometric data is encrypted and stored securely. It cannot be used for any purpose other than attendance verification.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BiometricVerification;