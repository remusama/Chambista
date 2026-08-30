import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./client";

export interface DashboardData {
  perfil: {
    id: number;
    nombre: string;
    nivelVerificacion: string;
    progresoVerificacion: number;
  };
  stats: {
    ingresosMes: number;
    variacionIngresos: number;
    trabajosPendientes: number;
    nuevasSolicitudes: number;
    trabajosProgramados: number;
    calificacionPromedio: number;
    tiempoRespuesta: string;
    mensajesSinLeer: number;
  };
  agenda: any[];
  solicitudes: any[];
}

export const useProviderDashboard = () => {
  return useQuery<DashboardData>({
    queryKey: ["providerDashboard"],
    queryFn: async () => {
      const { data } = await apiClient.get("/dashboard/provider");
      return data;
    },
    refetchInterval: 30000, // Poll for new solicitudes every 30 seconds
  });
};

export const useSearchProviders = (oficio: string | null) => {
  return useQuery({
    queryKey: ["searchProviders", oficio],
    queryFn: async () => {
      if (!oficio) return [];
      const { data } = await apiClient.post("/search/", { oficio });
      return data;
    },
    enabled: !!oficio,
  });
};

export const createBooking = async (bookingData: any) => {
  const { data } = await apiClient.post("/bookings/", bookingData);
  return data;
};

export const updateBookingStatus = async (bookingId: number, estado: string) => {
  const { data } = await apiClient.patch(`/bookings/${bookingId}?estado=${estado}`, {});
  return data;
};

export const useNotifications = (userId?: number) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      const url = userId 
        ? `/notifications/?user_id=${userId}` 
        : `/notifications/`;
      const { data } = await apiClient.get(url);
      return data as any[];
    },
    refetchInterval: 30000,
  });
};

export const useProviderReviews = (providerId?: number) => {
  return useQuery({
    queryKey: ["providerReviews", providerId],
    queryFn: async () => {
      if (!providerId) return [];
      const { data } = await apiClient.get(`/reviews/provider/${providerId}`);
      return data as any[];
    },
    enabled: !!providerId,
  });
};
