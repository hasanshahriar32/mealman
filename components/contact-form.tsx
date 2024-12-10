"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function ContactForm() {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    window.location.href = `mailto:paradoxtechbd@outlook.com?subject=Contact Us&body=${encodeURIComponent(message)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              Fill out the form and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600"
              onClick={handleSendMessage}
            >
              Send Message
            </Button>
          </CardFooter>
        </Card>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>Subra, Basherhat - Bura Dighi, 5200</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>01881-912263</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>paradoxtechbd@outlook.com</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224.70880034678504!2d88.65344176812874!3d25.693137848137138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4ad0d4db3415d%3A0xe055699456b9ba0d!2sAmin%20Hostel!5e0!3m2!1sen!2sbd!4v1733863329124!5m2!1sen!2sbd"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

