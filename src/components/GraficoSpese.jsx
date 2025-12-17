// src/components/GraficoSpese.jsx
import Card from "./card";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

// Palette coerente con il tema scuro nel CSS (più contrastata)
const COLORS = ["#4da6ff", "#33d6a6", "#a28bfe", "#ffd166", "#ff7aa2", "#ff6b6b", "#9be7ff"];

function currency(v) {
  return Number(v).toLocaleString(undefined, { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0].payload;
  return (
    <div style={{ background: 'rgba(0,0,0,0.6)', color: 'white', padding: 8, borderRadius: 8, fontSize: 13 }}>
      <div style={{ fontWeight: 700 }}>{p.name}</div>
      <div style={{ color: 'rgba(255,255,255,0.85)' }}>{currency(p.value)}</div>
    </div>
  );
}

function renderLabel(props) {
  // Render percent inside for >=5%, otherwise render outside (white) to avoid clutter.
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const pct = Math.round(percent * 100);
  const RAD = Math.PI / 180;

  if (pct >= 5) {
    // place label roughly halfway between inner and outer radius
    const labelRadius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + labelRadius * Math.cos((-midAngle) * RAD);
    const y = cy + labelRadius * Math.sin((-midAngle) * RAD);
    return (
      <text x={x} y={y} fill="#fff" fontSize={12} fontWeight={600} textAnchor="middle" dominantBaseline="central">
        {`${pct}%`}
      </text>
    );
  }

  // small slice: render percentage outside the donut
  const cos = Math.cos(-midAngle * RAD);
  const sin = Math.sin(-midAngle * RAD);
  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;
  const ex = cx + (outerRadius + 18) * cos;
  const ey = cy + (outerRadius + 18) * sin;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      {/* optional small connector */}
      <polyline points={`${sx},${sy} ${ex},${ey}`} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
      <text x={ex + (cos >= 0 ? 6 : -6)} y={ey} textAnchor={textAnchor} fill="#fff" fontSize={12} dominantBaseline="central">
        {`${pct}%`}
      </text>
    </g>
  );
}

export default function GraficoSpese({ spese = [] }) {
  const data = spese.map(s => ({ name: s.descrizione || 'Senza descrizione', value: Number(s.importo) || 0 }));
  const total = data.reduce((acc, d) => acc + d.value, 0);

  return (
    <Card className="grafico-card">
      <h3>Distribuzione spese</h3>
      <div className="chart-wrapper" style={{ position: 'relative', height: 320 }}>
        <ResponsiveContainer>
          <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={68}
                outerRadius={100}
                paddingAngle={4}
                startAngle={90}
                endAngle={-270}
                label={renderLabel}
                labelLine={false}
              >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ color: 'var(--muted)' }} />
          </PieChart>
        </ResponsiveContainer>

        <div className="chart-center" style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{currency(total)}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Totale</div>
        </div>
      </div>
    </Card>
  );
}
