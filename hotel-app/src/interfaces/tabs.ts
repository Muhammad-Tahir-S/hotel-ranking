export interface ITabs {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tabName: string) => void;
  style?: React.CSSProperties;
  color?: string;
  variant?: "primary" | "gradient";
  activeTabColor?: string;
}
