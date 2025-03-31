"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ticketSchema } from "@/lib/schemas/ticket";

const LIBRARIES: ("drawing" | "geometry")[] = ["places"];

export function CreateTicketForm() {
  const form = useForm<TTicketForm>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      poleType: "concreto",
      problemType: "apagada-noite"
    }
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_KEY!,
    libraries: LIBRARIES
  });

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    form.setValue("coordinates.lat", e.latLng!.lat());
    form.setValue("coordinates.lng", e.latLng!.lng());
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nome do Solicitante"
            registration={form.register("requesterName")}
            error={form.formState.errors.requesterName}
          />

          {/* Campo de Mapa Interativo */}
          {isLoaded && (
            <div className="col-span-full h-[400px]">
              <GoogleMap
                mapContainerClassName="w-full h-full rounded-lg border"
                center={{ lat: -23.5505, lng: -46.6333 }}
                zoom={13}
                onClick={handleMapClick}
              >
                <Marker
                  position={{
                    lat: form.watch("coordinates.lat"),
                    lng: form.watch("coordinates.lng")
                  }}
                />
              </GoogleMap>
            </div>
          )}

          {/* Seção de Dados do Poste */}
          <Select
            label="Tipo de Poste"
            options={POLE_TYPES}
            registration={form.register("poleType")}
          />
          
          <Textarea
            label="Observações"
            registration={form.register("observations")}
            rows={4}
          />
        </div>

        <Button type="submit" className="w-full">
          Enviar Solicitação
        </Button>
      </form>
    </Form>
  );
}