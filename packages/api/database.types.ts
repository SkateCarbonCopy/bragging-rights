export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      GameType: {
        Row: {
          dateCreated: string
          description: string | null
          gameTypeId: number
          name: string
        }
        Insert: {
          dateCreated?: string
          description?: string | null
          gameTypeId?: number
          name: string
        }
        Update: {
          dateCreated?: string
          description?: string | null
          gameTypeId?: number
          name?: string
        }
        Relationships: []
      }
      Match: {
        Row: {
          dateCreated: string | null
          gameTypeId: number
          hasAsterisk: boolean | null
          matchId: number
          notes: string | null
          playedAt: string | null
        }
        Insert: {
          dateCreated?: string | null
          gameTypeId: number
          hasAsterisk?: boolean | null
          matchId?: number
          notes?: string | null
          playedAt?: string | null
        }
        Update: {
          dateCreated?: string | null
          gameTypeId?: number
          hasAsterisk?: boolean | null
          matchId?: number
          notes?: string | null
          playedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Match_gameTypeId_fkey"
            columns: ["gameTypeId"]
            isOneToOne: false
            referencedRelation: "GameType"
            referencedColumns: ["gameTypeId"]
          },
        ]
      }
      MatchPlayer: {
        Row: {
          dateCreated: string | null
          isWinner: boolean
          matchId: number
          matchPlayerId: number
          userId: number | null
        }
        Insert: {
          dateCreated?: string | null
          isWinner: boolean
          matchId: number
          matchPlayerId?: number
          userId?: number | null
        }
        Update: {
          dateCreated?: string | null
          isWinner?: boolean
          matchId?: number
          matchPlayerId?: number
          userId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "MatchPlayer_matchId_fkey"
            columns: ["matchId"]
            isOneToOne: false
            referencedRelation: "Match"
            referencedColumns: ["matchId"]
          },
          {
            foreignKeyName: "MatchPlayer_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["userId"]
          },
        ]
      }
      User: {
        Row: {
          avatarUrl: string | null
          dateCreated: string | null
          email: string
          userId: number
          username: string
        }
        Insert: {
          avatarUrl?: string | null
          dateCreated?: string | null
          email: string
          userId?: number
          username: string
        }
        Update: {
          avatarUrl?: string | null
          dateCreated?: string | null
          email?: string
          userId?: number
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
