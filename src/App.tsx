import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Users,
  Trophy,
  AlertTriangle,
  Layers,
  History,
  GraduationCap,
  Shield,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Settings,
  Plus,
  Trash2,
  Download,
  Search,
  ExternalLink,
  ChevronRight,
  Filter,
  Eye,
  Check,
  X,
  RefreshCw,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';

export default function TennisCoreHub() {
  // Navigation
  const [activeTab, setActiveTab] = useState('programes');
  const [lang, setLang] = useState('ca'); // 'ca' | 'es'
  const [theme, setTheme] = useState('light');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Global Courts Status State
  const [courts, setCourts] = useState(
    Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      name: `Pista ${i + 1}`,
      surface: i < 12 ? 'Terra batuda' : 'Pista ràpida',
      status: 'operative', // 'operative' | 'warning' | 'closed'
      active: true
    }))
  );

  const [courtAlerts, setCourtAlerts] = useState([
    {
      id: 1,
      date: '05/11 19:30',
      status: 'warning',
      courts: [1, 2, 3, 4],
      comment: 'Pistes en assecat. Revisió a les 20:00.',
      author: 'Toni Rivas'
    }
  ]);

  const [selectedCourtsForAlert, setSelectedCourtsForAlert] = useState([]);
  const [newAlertComment, setNewAlertComment] = useState('');
  const [newAlertStatus, setNewAlertStatus] = useState('warning');

  // Programs State
  const [programs] = useState([
    { id: 'eb', name: 'Escola Base', category: 'Escoles', ages: '5 a 8 anys', days: 'Dl, Dj', time: '17:30 - 18:30', courts: '1, 2', coach: 'Marta Soler', capacity: 16, enrolled: 14 },
    { id: 'ea', name: "Escola d'Adults", category: 'Escoles', ages: '+18 anys', days: 'Dt, Dv', time: '19:30 - 21:00', courts: '3, 4, 5', coach: 'Oscar Hernández', capacity: 12, enrolled: 11 },
    { id: 'ej', name: 'Escola de Joves', category: 'Escoles', ages: '12 a 16 anys', days: 'Dl, Dc, Dv', time: '18:30 - 20:00', courts: '6, 7', coach: 'Toni Rivas', capacity: 12, enrolled: 12 },
    { id: 'ep', name: 'Escola Perfeccionament', category: 'Escoles', ages: '9 a 12 anys', days: 'Dt, Dj', time: '17:30 - 19:00', courts: '8, 9', coach: 'Víctor Piñones', capacity: 8, enrolled: 8 },
    { id: 't1', name: 'Tecnificació 1', category: 'Competicions', ages: 'Sub-14', days: 'Dl a Dv', time: '16:00 - 18:00', courts: '10, 11, 12', coach: 'Oscar Hernández', capacity: 6, enrolled: 6 },
    { id: 't2', name: 'Tecnificació 2 Tarda', category: 'Competicions', ages: 'Sub-18', days: 'Dl a Dv', time: '18:00 - 20:30', courts: '13, 14', coach: 'Toni Rivas', capacity: 4, enrolled: 4 }
  ]);

  // Students State
  const [students, setStudents] = useState([
    { id: 1, name: 'Abril Jansà', birthYear: 2012, program: 'Escola de Joves', familyCode: 'JAN-2024', status: 'Disponible', focus: 'Acceleració en revés creuat i split step', level: 'N2' },
    { id: 2, name: 'Santi Bodu', birthYear: 2011, program: 'Tecnificació 1', familyCode: 'BOD-1982', status: 'Disponible', focus: 'Alçada de bola en defensa i servei pla', level: 'N3' },
    { id: 3, name: 'Adrià García', birthYear: 2014, program: 'Escola Base', familyCode: 'GAR-9941', status: 'Lesió', focus: 'Empunyadura semi-oest de dreta', level: 'N1' },
    { id: 4, name: 'Héctor García', birthYear: 2013, program: 'Escola Perfeccionament', familyCode: 'GAR-9941', status: 'Disponible', focus: 'Joc de peus a mitja pista', level: 'N2' },
    { id: 5, name: 'Eneko Pérez', birthYear: 2010, program: 'Tecnificació 2 Tarda', familyCode: 'PER-4401', status: 'Disponible', focus: 'Transició defensa-atac amb slice', level: 'N3' }
  ]);
  const [searchStudent, setSearchStudent] = useState('');
  const [filterStudentProgram, setFilterStudentProgram] = useState('all');

  // League (Lliga) State
  const [selectedTeam, setSelectedTeam] = useState('Cadet Femení "A"');
  const [leagueMatches, setLeagueMatches] = useState([
    { round: 'J1', date: '12/10', opponent: 'CT Sabadell', result: '4-1', playerStates: { 1: 'J', 2: 'NC', 3: 'NC', 4: 'M/Alt', 5: 'NC' } },
    { round: 'J2', date: '19/10', opponent: 'Club Tennis Vic', result: '3-2', playerStates: { 1: 'J', 2: 'NC', 3: 'NC', 4: 'J', 5: 'NC' } },
    { round: 'J3', date: '26/10', opponent: 'CT Vallès', result: '2-3', playerStates: { 1: 'M/Alt', 2: 'NC', 3: 'NC', 4: 'J', 5: 'NC' } },
    { round: 'J4', date: '02/11', opponent: 'CT Barcino', result: '4-1', playerStates: { 1: 'J', 2: 'NC', 3: 'NC', 4: 'J', 5: 'NC' } }
  ]);

  // Capitany State
  const [capitanyFilter, setCapitanyFilter] = useState('all');
  const [capitanySheets, setCapitanySheets] = useState([
    { id: 1, date: '02/11/2026', coach: 'Oscar Hernández', comp: 'Lliga Catalana', type: 'Jornada completa', km: 84, diets: 1, total: 116.50, status: 'Aprovada' },
    { id: 2, date: '26/10/2026', coach: 'Toni Rivas', comp: 'Campionat de Catalunya', type: 'Mitja jornada', km: 32, diets: 0, total: 53.32, status: 'Pagat' },
    { id: 3, date: '19/10/2026', coach: 'Víctor Piñones', comp: 'Lliga Catalana', type: 'Jornada completa', km: 120, diets: 1, total: 126.20, status: 'Per revisar' }
  ]);

  // Quadrant State
  const [selectedDay, setSelectedDay] = useState('Dl');
  const [attendance, setAttendance] = useState({ 1: true, 2: true, 3: false, 4: true, 5: true });

  // Translations
  const t = {
    ca: {
      tagline: 'Gestió Esportiva de Tennis',
      courtBanner: 'Pistes operatives: actualitzat fa 5 min.',
      courtBannerWarn: 'Atenció: Algunes pistes estan en revisió o assecat.',
      programes: 'Programes',
      alumnes: 'Alumnes',
      lliga: 'Lliga',
      pistes: 'Pistes',
      grups: 'Grups',
      historial: 'Historial',
      particulars: 'Particulars',
      equipTecnic: 'Equip tècnic',
      capitanies: 'Capitanies',
      elMeuQuadrant: 'El meu quadrant',
      cercar: 'Cercar alumne, família o focus...',
      nouPrograma: '+ Nou programa',
      passarLlista: 'Passar llista',
      exportarCsv: 'Exportar CSV'
    },
    es: {
      tagline: 'Gestión Deportiva de Tenis',
      courtBanner: 'Pistas operativas: actualizado hace 5 min.',
      courtBannerWarn: 'Atención: Algunas pistas están en revisión o secado.',
      programes: 'Programas',
      alumnes: 'Alumnos',
      lliga: 'Liga',
      pistes: 'Pistas',
      grups: 'Grupos',
      historial: 'Historial',
      particulars: 'Particulares',
      equipTecnic: 'Equipo técnico',
      capitanies: 'Capitanías',
      elMeuQuadrant: 'Mi cuadrante',
      cercar: 'Buscar alumno, familia o foco...',
      nouPrograma: '+ Nuevo programa',
      passarLlista: 'Pasar lista',
      exportarCsv: 'Exportar CSV'
    }
  }[lang];

  // Helper toggle court alert selection
  const toggleCourtSelection = (courtId) => {
    setSelectedCourtsForAlert(prev =>
      prev.includes(courtId) ? prev.filter(id => id !== courtId) : [...prev, courtId]
    );
  };

  const publishCourtAlert = () => {
    if (selectedCourtsForAlert.length === 0) return;
    const newAlert = {
      id: Date.now(),
      date: 'Ara mateix',
      status: newAlertStatus,
      courts: selectedCourtsForAlert,
      comment: newAlertComment || 'Sense observacions',
      author: 'Toni Rivas'
    };
    setCourtAlerts([newAlert, ...courtAlerts]);
    setCourts(courts.map(c => selectedCourtsForAlert.includes(c.id) ? { ...c, status: newAlertStatus } : c));
    setSelectedCourtsForAlert([]);
    setNewAlertComment('');
  };

  // Helper toggle match player state
  const cyclePlayerState = (roundIdx, studentId) => {
    const states = ['NC', 'J', 'M/Alt', 'R'];
    setLeagueMatches(prev => {
      const copy = [...prev];
      const current = copy[roundIdx].playerStates[studentId] || 'NC';
      const nextIdx = (states.indexOf(current) + 1) % states.length;
      copy[roundIdx].playerStates[studentId] = states[nextIdx];
      return copy;
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} flex flex-col font-sans transition-colors duration-150`}>
      {/* Top Header */}
      <header className={`h-16 px-6 border-b ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} flex items-center justify-between sticky top-0 z-40 shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-emerald-500/20 shadow-lg">
            TC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight">TennisCore Hub</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold">2026-27</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.tagline}</p>
          </div>
        </div>

        {/* Real-time Courts Semaphore Banner */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{t.courtBanner}</span>
        </div>

        {/* User Profile & Quick Settings */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              TR
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold leading-tight">Toni Rivas</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Direcció</p>
            </div>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className={`w-64 border-r ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-4 flex flex-col gap-1.5 overflow-y-auto`}>
          {[
            { id: 'programes', icon: Layers, label: t.programes },
            { id: 'alumnes', icon: Users, label: t.alumnes },
            { id: 'lliga', icon: Trophy, label: t.lliga },
            { id: 'pistes', icon: AlertTriangle, label: t.pistes },
            { id: 'grups', icon: GraduationCap, label: t.grups },
            { id: 'historial', icon: History, label: t.historial },
            { id: 'particulars', icon: Clock, label: t.particulars },
            { id: 'equipTecnic', icon: Shield, label: t.equipTecnic },
            { id: 'capitanies', icon: FileSpreadsheet, label: t.capitanies },
            { id: 'elMeuQuadrant', icon: Calendar, label: t.elMeuQuadrant }
          ].map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  active
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* View Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: PROGRAMES */}
          {activeTab === 'programes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{t.programes}</h1>
                  <p className="text-sm text-slate-500">Temporada 2026-27 · Escola de Tennis i Equips</p>
                </div>
                <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow">
                  <Plus className="w-4 h-4" />
                  {t.nouPrograma}
                </button>
              </div>

              {['Escoles', 'Competicions'].map(cat => (
                <div key={cat} className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">{cat}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {programs.filter(p => p.category === cat).map(p => (
                      <div key={p.id} className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-3 hover:border-emerald-500 transition-all`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-base">{p.name}</h3>
                            <span className="text-xs text-slate-400">{p.ages}</span>
                          </div>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                            p.enrolled >= p.capacity ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          }`}>
                            {p.enrolled}/{p.capacity}
                          </span>
                        </div>
                        <div className="text-xs space-y-1.5 text-slate-500 dark:text-slate-400 border-t pt-3 border-slate-100 dark:border-slate-700">
                          <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {p.days} · {p.time}</p>
                          <p className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Pistes: {p.courts}</p>
                          <p className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200"><Users className="w-3.5 h-3.5" /> Resp: {p.coach}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: ALUMNES */}
          {activeTab === 'alumnes' && (
            <div className="space-y-5">
              <div className="flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl font-bold">{t.alumnes}</h1>
                  <p className="text-sm text-slate-500">Base de dades de jugadors, tutors i objectius tècnics</p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t.cercar}
                      value={searchStudent}
                      onChange={(e) => setSearchStudent(e.target.value)}
                      className={`w-full pl-9 pr-4 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    />
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} overflow-hidden shadow-sm`}>
                <table className="w-full text-left text-sm">
                  <thead className={`border-b text-xs uppercase font-bold text-slate-400 ${theme === 'dark' ? 'bg-slate-900/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <tr>
                      <th className="py-3.5 px-4">Alumne/a</th>
                      <th className="py-3.5 px-4">Any</th>
                      <th className="py-3.5 px-4">Programa</th>
                      <th className="py-3.5 px-4">Codi Família</th>
                      <th className="py-3.5 px-4">Estat</th>
                      <th className="py-3.5 px-4">Focus Tècnic</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                    {students
                      .filter(s => s.name.toLowerCase().includes(searchStudent.toLowerCase()) || s.focus.toLowerCase().includes(searchStudent.toLowerCase()))
                      .map(s => (
                        <tr key={s.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-700/30 transition-colors">
                          <td className="py-3.5 px-4 font-semibold flex items-center gap-2">
                            <span>{s.name}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold">{s.level}</span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">{s.birthYear}</td>
                          <td className="py-3.5 px-4">{s.program}</td>
                          <td className="py-3.5 px-4 font-mono text-xs text-slate-500">{s.familyCode}</td>
                          <td className="py-3.5 px-4">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                              s.status === 'Disponible' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            }`}>
                              {s.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-300 italic">{s.focus}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: LLIGA */}
          {activeTab === 'lliga' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">{t.lliga}</h1>
                  <p className="text-sm text-slate-500">Convocatòries i resultats d'equips</p>
                </div>
                <div className="flex gap-2">
                  {['Cadet Femení "A"', 'Infantil Femení "A"', 'Absolut Masculí "B"'].map(team => (
                    <button
                      key={team}
                      onClick={() => setSelectedTeam(team)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border ${
                        selectedTeam === team
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {team}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
                <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-slate-700">
                  <div>
                    <h2 className="text-lg font-bold">{selectedTeam}</h2>
                    <p className="text-xs text-slate-400">Capitana: Marta Soler</p>
                  </div>
                  <span className="text-xs text-slate-400 italic">Fes clic a cada casella per canviar estat: NC → J → M/Alt → R</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-center text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="py-3 px-4 text-left font-bold text-slate-400 uppercase">Jugador/a</th>
                        {leagueMatches.map(m => (
                          <th key={m.round} className="py-3 px-4">
                            <span className="font-bold block text-sm">{m.round}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{m.date} vs {m.opponent}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {students.map(player => (
                        <tr key={player.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20">
                          <td className="py-3 px-4 text-left font-semibold">{player.name}</td>
                          {leagueMatches.map((m, rIdx) => {
                            const st = m.playerStates[player.id] || 'NC';
                            const colorMap = {
                              'J': 'bg-emerald-500 text-white font-bold',
                              'M/Alt': 'bg-amber-400 text-slate-900 font-bold',
                              'R': 'bg-rose-500 text-white font-bold',
                              'NC': 'bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-400'
                            };
                            return (
                              <td key={m.round} className="py-2 px-4">
                                <button
                                  onClick={() => cyclePlayerState(rIdx, player.id)}
                                  className={`w-14 py-1.5 rounded-lg text-xs transition-transform active:scale-95 ${colorMap[st]}`}
                                >
                                  {st}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                      <tr className="font-bold border-t-2 border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/30">
                        <td className="py-3 px-4 text-left">Resultat</td>
                        {leagueMatches.map(m => (
                          <td key={m.round} className="py-3 px-4 text-emerald-600 font-extrabold">{m.result}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PISTES */}
          {activeTab === 'pistes' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">{t.pistes}</h1>
                <p className="text-sm text-slate-500">Estat en temps real de les 16 pistes i emissió d'avisos</p>
              </div>

              {/* Alert Creation Box */}
              <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
                <h3 className="font-bold text-sm">Publicar avís de pistes</h3>
                <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-16 gap-2">
                  {courts.map(c => {
                    const isSelected = selectedCourtsForAlert.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => toggleCourtSelection(c.id)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-400'
                            : c.status === 'warning'
                            ? 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                            : 'bg-slate-100 dark:bg-slate-700 border-transparent text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        P{c.id}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={newAlertStatus}
                    onChange={(e) => setNewAlertStatus(e.target.value)}
                    className={`px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
                  >
                    <option value="operative">Operativa (Verd)</option>
                    <option value="warning">Precaució / Assecant (Groc)</option>
                    <option value="closed">Impracticable (Vermell)</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Comentari (ex: Pistes 1-4 en assecat, revisió a les 18h)"
                    value={newAlertComment}
                    onChange={(e) => setNewAlertComment(e.target.value)}
                    className={`flex-1 px-4 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                  <button
                    onClick={publishCourtAlert}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow"
                  >
                    Publicar
                  </button>
                </div>
              </div>

              {/* History Alerts */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">Historial d'avisos actius</h3>
                {courtAlerts.map(a => (
                  <div key={a.id} className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} flex justify-between items-center`}>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div>
                        <p className="text-sm font-bold">Pistes {a.courts.join(', ')} · {a.comment}</p>
                        <p className="text-xs text-slate-400">{a.date} per {a.author}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setCourtAlerts(courtAlerts.filter(x => x.id !== a.id))}
                      className="p-1 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GRUPS */}
          {activeTab === 'grups' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">{t.grups}</h1>
                <p className="text-sm text-slate-500">Planificació pedagògica trimestral i pissarra de pistes</p>
              </div>

              <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} space-y-4`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-base">Objectius Pedagògics - Trimestre 1 (T1)</h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">Tecnificació 1 & 2</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 space-y-2">
                    <h4 className="font-bold text-xs uppercase text-slate-400">Què es treballa</h4>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      Consolidació de la continuïtat de fons, canvi d'alçades i ritmes d'intercanvi. Servei: llançament precís i consistència amb el 2n servei amb efecte kick o tallat.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 space-y-2">
                    <h4 className="font-bold text-xs uppercase text-slate-400">Objectius de competició</h4>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      Minimitzar errors no forçats en boles de transició. Mantenir rutina de respiració i focalització positiva abans de cada punt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: HISTORIAL */}
          {activeTab === 'historial' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">{t.historial}</h1>
                  <p className="text-sm text-slate-500">Auditoria cronològica de canvis realitzats per l'equip</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Download className="w-4 h-4" />
                  {t.exportarCsv}
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { time: '05/11 19:30', user: 'Toni Rivas', role: 'Director', action: 'Alta avís de pistes', detail: 'Pistes 1, 2, 3, 4 en assecat' },
                  { time: '05/11 18:15', user: 'Oscar Hernández', role: 'Entrenador', action: 'Canvi de convocatòria', detail: 'Cadet Femení J4: Abril Jansà convocada com a titular' },
                  { time: '04/11 12:40', user: 'Marta Soler', role: 'Coordinadora', action: 'Actualització full capitania', detail: 'Desplaçament CT Sabadell marcat com a aprovat' }
                ].map((log, i) => (
                  <div key={i} className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} flex justify-between items-center text-xs`}>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="font-semibold text-sm">{log.action}</p>
                        <p className="text-slate-400">{log.detail}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{log.user} ({log.role})</p>
                      <p className="text-slate-400">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: PARTICULARS */}
          {activeTab === 'particulars' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">{t.particulars}</h1>
                  <p className="text-sm text-slate-500">Control de classes privades, assistència i liquidacions</p>
                </div>
                <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">
                  <Plus className="w-4 h-4" /> Nova classe
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <p className="text-xs text-slate-400 font-bold uppercase">Total Classes</p>
                  <p className="text-2xl font-extrabold mt-1">28</p>
                </div>
                <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <p className="text-xs text-slate-400 font-bold uppercase">Signades</p>
                  <p className="text-2xl font-extrabold text-emerald-500 mt-1">26</p>
                </div>
                <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <p className="text-xs text-slate-400 font-bold uppercase">Hores totals</p>
                  <p className="text-2xl font-extrabold mt-1">32:00h</p>
                </div>
                <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <p className="text-xs text-slate-400 font-bold uppercase">Import acumulat</p>
                  <p className="text-2xl font-extrabold text-emerald-600 mt-1">1.120 €</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: EQUIP TECNIC */}
          {activeTab === 'equipTecnic' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">{t.equipTecnic}</h1>
                  <p className="text-sm text-slate-500">Staff tècnic, titulacions oficials i hores de contracte</p>
                </div>
                <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">
                  <Plus className="w-4 h-4" /> Convidar tècnic
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Toni Rivas', role: 'Direcció Esportiva', qual: 'Nivell 2 FCT - ECE', hours: '25h / 25h', regime: 'Jornada completa' },
                  { name: 'Oscar Hernández', role: 'Head Coach Competició', qual: 'Ex-ATP 48 · Entrenador Nacional', hours: '20h / 20h', regime: 'Mitja jornada' },
                  { name: 'Marta Soler', role: 'Coordinadora Escola Base', qual: 'Nivell 1 FCT', hours: '15h / 15h', regime: 'Mitja jornada' }
                ].map((coach, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} space-y-3`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center">
                        {coach.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">{coach.name}</h3>
                        <p className="text-xs text-slate-400">{coach.role}</p>
                      </div>
                    </div>
                    <div className="border-t pt-3 border-slate-100 dark:border-slate-700 text-xs space-y-1.5 text-slate-500">
                      <p className="font-medium text-emerald-600">{coach.qual}</p>
                      <p>Hores: {coach.hours} ({coach.regime})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: CAPITANIES */}
          {activeTab === 'capitanies' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">{t.capitanies}</h1>
                  <p className="text-sm text-slate-500">Fulls de desplaçament, dietes i quilometratge de competició</p>
                </div>
                <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">
                  <Plus className="w-4 h-4" /> Nou full
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {capitanySheets.map(sheet => (
                  <div key={sheet.id} className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} space-y-3`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm">{sheet.comp}</h4>
                        <p className="text-xs text-slate-400">{sheet.date} · {sheet.coach}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        sheet.status === 'Pagat' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {sheet.status}
                      </span>
                    </div>
                    <div className="border-t pt-3 border-slate-100 dark:border-slate-700 text-xs flex justify-between items-center">
                      <span className="text-slate-400">{sheet.km} km · {sheet.type}</span>
                      <span className="font-extrabold text-base text-emerald-600">{sheet.total.toFixed(2)} €</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: EL MEU QUADRANT */}
          {activeTab === 'elMeuQuadrant' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">{t.elMeuQuadrant}</h1>
                  <p className="text-sm text-slate-500">Horari setmanal i passar llista a pista</p>
                </div>
                <div className="flex gap-1.5 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
                  {['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds'].map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDay(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedDay === d ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} space-y-5 shadow-sm`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">Tecnificació 2 Tarda · 18:00 - 20:30</h3>
                    <p className="text-xs text-slate-400">Pistes 13, 14 · Entrenador: Toni Rivas</p>
                  </div>
                  <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:bg-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    {t.passarLlista}
                  </button>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-400">Alumnes del grup (Fes clic per marcar assistència)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {students.slice(0, 4).map(st => {
                      const present = attendance[st.id] ?? true;
                      return (
                        <button
                          key={st.id}
                          onClick={() => setAttendance({ ...attendance, [st.id]: !present })}
                          className={`p-3.5 rounded-xl border text-left flex justify-between items-center transition-all ${
                            present
                              ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800'
                              : 'bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800'
                          }`}
                        >
                          <div>
                            <p className="font-bold text-sm leading-tight">{st.name}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{st.focus}</p>
                          </div>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${present ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                            {present ? '✓' : '✕'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl p-6 border shadow-2xl space-y-5 ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Configuració d'Usuari</h3>
              <button onClick={() => setIsSettingsOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Idioma / Lenguaje</label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  <button
                    onClick={() => setLang('ca')}
                    className={`py-2 rounded-xl font-semibold border ${lang === 'ca' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    Català
                  </button>
                  <button
                    onClick={() => setLang('es')}
                    className={`py-2 rounded-xl font-semibold border ${lang === 'es' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    Castellano
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Aspecte / Tema</label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  <button
                    onClick={() => setTheme('light')}
                    className={`py-2 flex items-center justify-center gap-2 rounded-xl font-semibold border ${theme === 'light' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    <Sun className="w-4 h-4" /> Clar
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`py-2 flex items-center justify-center gap-2 rounded-xl font-semibold border ${theme === 'dark' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    <Moon className="w-4 h-4" /> Fosc
                  </button>
                </div>
              </div>

              <div className="border-t pt-4 border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-400">Usuari connectat: <strong>Toni Rivas</strong> (tonirivas@sportunityprograms.com)</p>
                <p className="text-xs text-slate-400">Rol actiu: <strong>Direcció Esportiva</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}