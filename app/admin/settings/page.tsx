"use client";

import type React from "react";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AdminSettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "BeautéHub",
    storeEmail: "contact@beautehub.com",
    storePhone: "+33 1 23 45 67 89",
    storeAddress: "123 Rue de la Beauté, 75001 Paris, France",
    storeCurrency: "EUR",
    storeLanguage: "fr",
    storeDescription:
      "Des produits de soins et cosmétiques premium qui mettent en valeur votre beauté naturelle.",
    enableReviews: true,
    enableWishlist: true,
    enableNewsletter: true,
    maintenanceMode: false,
    taxEnabled: true,
    inventoryTracking: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStoreSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setStoreSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pourriez envoyer les données à votre API
    alert("Paramètres enregistrés avec succès !");
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
      </div>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Avancé</TabsTrigger>
          <TabsTrigger value="shipping">Livraison</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <form onSubmit={handleSave}>
              <CardHeader>
                <CardTitle>Informations de la boutique</CardTitle>
                <CardDescription>
                  Ces informations seront affichées sur votre site et dans les
                  emails envoyés aux clients.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Nom de la boutique</Label>
                    <Input
                      id="storeName"
                      name="storeName"
                      value={storeSettings.storeName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Email</Label>
                    <Input
                      id="storeEmail"
                      name="storeEmail"
                      type="email"
                      value={storeSettings.storeEmail}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Téléphone</Label>
                    <Input
                      id="storePhone"
                      name="storePhone"
                      value={storeSettings.storePhone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeCurrency">Devise</Label>
                    <Select defaultValue={storeSettings.storeCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une devise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="USD">
                          Dollar américain ($)
                        </SelectItem>
                        <SelectItem value="GBP">Livre sterling (£)</SelectItem>
                        <SelectItem value="CHF">Franc suisse (CHF)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Adresse</Label>
                  <Input
                    id="storeAddress"
                    name="storeAddress"
                    value={storeSettings.storeAddress}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">Description</Label>
                  <Textarea
                    id="storeDescription"
                    name="storeDescription"
                    value={storeSettings.storeDescription}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Enregistrer les modifications</Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paramètres de la boutique</CardTitle>
              <CardDescription>
                Configurez les paramètres généraux de votre boutique.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="taxEnabled">Activer les taxes</Label>
                  <p className="text-sm text-muted-foreground">
                    Appliquer automatiquement les taxes aux commandes.
                  </p>
                </div>
                <Switch
                  id="taxEnabled"
                  checked={storeSettings.taxEnabled}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("taxEnabled", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="inventoryTracking">Suivi des stocks</Label>
                  <p className="text-sm text-muted-foreground">
                    Suivre automatiquement les niveaux de stock des produits.
                  </p>
                </div>
                <Switch
                  id="inventoryTracking"
                  checked={storeSettings.inventoryTracking}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("inventoryTracking", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableReviews">Avis clients</Label>
                  <p className="text-sm text-muted-foreground">
                    Permettre aux clients de laisser des avis sur les produits.
                  </p>
                </div>
                <Switch
                  id="enableReviews"
                  checked={storeSettings.enableReviews}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("enableReviews", checked)
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thème et couleurs</CardTitle>
              <CardDescription>
                Personnalisez l'apparence de votre boutique.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Couleur principale</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      className="w-12 h-10 p-1"
                      defaultValue="#7c3aed"
                    />
                    <Input defaultValue="#7c3aed" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Couleur secondaire</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      className="w-12 h-10 p-1"
                      defaultValue="#f43f5e"
                    />
                    <Input defaultValue="#f43f5e" className="flex-1" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Thème</Label>
                <Select defaultValue="light">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un thème" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Clair</SelectItem>
                    <SelectItem value="dark">Sombre</SelectItem>
                    <SelectItem value="system">Système</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Police</Label>
                <Select defaultValue="inter">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une police" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                    <SelectItem value="poppins">Poppins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => alert("Apparence mise à jour")}>
                Enregistrer les modifications
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logo et favicon</CardTitle>
              <CardDescription>
                Téléchargez votre logo et favicon.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-32 border rounded flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground">Logo</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Télécharger
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Favicon</Label>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 border rounded flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground text-xs">
                      Favicon
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Télécharger
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => alert("Images mises à jour")}
              >
                Enregistrer les modifications
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres des emails</CardTitle>
              <CardDescription>
                Configurez les emails envoyés à vos clients.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email d'expédition</Label>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un modèle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Modèle par défaut</SelectItem>
                    <SelectItem value="minimal">Minimaliste</SelectItem>
                    <SelectItem value="branded">Personnalisé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Email de confirmation de commande</Label>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un modèle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Modèle par défaut</SelectItem>
                    <SelectItem value="minimal">Minimaliste</SelectItem>
                    <SelectItem value="branded">Personnalisé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Email d'abandon de panier</Label>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un modèle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Modèle par défaut</SelectItem>
                    <SelectItem value="minimal">Minimaliste</SelectItem>
                    <SelectItem value="branded">Personnalisé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => alert("Paramètres des emails mis à jour")}>
                Enregistrer les modifications
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications administrateur</CardTitle>
              <CardDescription>
                Configurez les notifications que vous recevez en tant
                qu'administrateur.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Nouvelles commandes</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir une notification pour chaque nouvelle commande.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Produits en rupture de stock</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir une notification lorsqu'un produit est en rupture
                    de stock.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Nouveaux avis clients</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir une notification pour chaque nouvel avis client.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => alert("Notifications mises à jour")}
              >
                Enregistrer les modifications
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mode maintenance</CardTitle>
              <CardDescription>
                Activez le mode maintenance pour empêcher l'accès à votre
                boutique pendant les mises à jour.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode">Mode maintenance</Label>
                  <p className="text-sm text-muted-foreground">
                    Lorsqu'il est activé, les visiteurs verront une page de
                    maintenance au lieu de votre boutique.
                  </p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={storeSettings.maintenanceMode}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("maintenanceMode", checked)
                  }
                />
              </div>
              {storeSettings.maintenanceMode && (
                <Alert variant="warning">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Attention</AlertTitle>
                  <AlertDescription>
                    Le mode maintenance est actuellement activé. Votre boutique
                    n'est pas accessible aux visiteurs.
                  </AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="maintenanceMessage">
                  Message de maintenance
                </Label>
                <Textarea
                  id="maintenanceMessage"
                  placeholder="Notre boutique est actuellement en maintenance. Nous serons de retour très bientôt !"
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => alert("Mode maintenance mis à jour")}>
                Enregistrer les modifications
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sauvegarde et restauration</CardTitle>
              <CardDescription>
                Sauvegardez et restaurez les données de votre boutique.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Sauvegarde des données</Label>
                <p className="text-sm text-muted-foreground">
                  Créez une sauvegarde complète de votre boutique, y compris les
                  produits, les commandes et les clients.
                </p>
                <Button variant="outline">Créer une sauvegarde</Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Restauration des données</Label>
                <p className="text-sm text-muted-foreground">
                  Restaurez votre boutique à partir d'une sauvegarde précédente.
                </p>
                <div className="flex items-center gap-2">
                  <Input type="file" />
                  <Button variant="outline">Restaurer</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Livraison</CardTitle>
              <CardDescription>
                Configurez les paramètres de livraison de votre boutique.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shipping-method">Méthode de livraison</Label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une méthode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipping-cost">Coût de livraison</Label>
                <Input id="shipping-cost" type="number" defaultValue="5.00" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => alert("Paramètres de livraison mis à jour")}
              >
                Enregistrer les modifications
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
