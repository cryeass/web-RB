// State Management
const state = {
    user: null, // { role: 'alumni' | 'admin', name: string }
    currentView: 'dashboard',
    alumniData: [
        { 
            id: 1, name: 'Budi Santoso', year: 2022, status: 'Swasta', company: 'Tech Corp', position: 'Software Engineer',
            email: 'budi.santoso@email.com', phone: '08123456789', address: 'Jakarta Selatan',
            socials: { linkedin: 'linkedin.com/in/budi', ig: '@budi_s', fb: 'Budi Santoso', tiktok: '@buditok' },
            workAddress: 'Jl. Sudirman No. 10, Jakarta', workSocials: '@techcorp_official'
        },
        { 
            id: 2, name: 'Siti Aminah', year: 2021, status: 'Wirausaha', company: 'Kedai Kopi', position: 'Owner',
            email: 'siti.aminah@email.com', phone: '08129876543', address: 'Bandung',
            socials: { linkedin: 'linkedin.com/in/siti', ig: '@sitiaminah', fb: 'Siti Aminah', tiktok: '-' },
            workAddress: 'Jl. Braga No. 5, Bandung', workSocials: '@kedaikopi_braga'
        },
        { 
            id: 3, name: 'Andi Wijaya', year: 2023, status: 'Mencari Kerja', company: '-', position: '-',
            email: 'andi.w@email.com', phone: '08134455667', address: 'Surabaya',
            socials: { linkedin: '-', ig: '@andiw', fb: '-', tiktok: '-' },
            workAddress: '-', workSocials: '-'
        },
        { 
            id: 4, name: 'Rina Putri', year: 2020, status: 'PNS', company: 'Kementerian Keuangan', position: 'Analisis Data',
            email: 'rina.putri@kemenkeu.go.id', phone: '08127788990', address: 'Depok',
            socials: { linkedin: 'linkedin.com/in/rinaputri', ig: '@rinap', fb: 'Rina Putri', tiktok: '-' },
            workAddress: 'Jl. Lapangan Banteng Timur No. 2-4, Jakarta', workSocials: '@kemenkeuri'
        },
        { 
            id: 5, name: 'Fajar Ramadhan', year: 2022, status: 'Swasta', company: 'Shopee Indonesia', position: 'UI/UX Designer',
            email: 'fajar.r@shopee.com', phone: '08561122334', address: 'Tangerang',
            socials: { linkedin: 'linkedin.com/in/fajarramadhan', ig: '@fajarr', fb: '-', tiktok: '@fajardesigner' },
            workAddress: 'Pacific Century Place, SCBD, Jakarta', workSocials: '@shopee_id'
        }
    ],
    questionnaireStats: {
        relevance: [65, 20, 10, 5], // Sangat Relevan, Relevan, Cukup, Tidak
        salary: [15, 45, 30, 10], // >10jt, 5-10jt, 3-5jt, <3jt
    }
};

// UI Components
const components = {
    // Alumni Components
    alumniHome: () => `
        <div class="fade-in space-y-6">
            <div class="bg-blue-600 rounded-2xl p-8 text-white shadow-lg shadow-blue-100 relative overflow-hidden">
                <div class="relative z-10">
                    <h3 class="text-3xl font-bold mb-2">Halo, ${state.user.name}!</h3>
                    <p class="text-blue-100 text-lg max-w-md">Selamat datang di Sistem Pelacakan Alumni. Mari bantu kami meningkatkan kualitas institusi dengan mengisi data terbaru Anda.</p>
                </div>
                <i data-lucide="graduation-cap" class="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-blue-500 opacity-20 rotate-12"></i>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button onclick="ui.navigate('profile')" class="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-blue-500 transition-all text-left group">
                    <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <i data-lucide="user-circle" class="w-6 h-6"></i>
                    </div>
                    <h4 class="font-bold text-slate-800 mb-1">Update Profil</h4>
                    <p class="text-sm text-slate-500">Perbarui informasi kontak dan data diri Anda.</p>
                </button>
                <button onclick="ui.navigate('job')" class="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-blue-500 transition-all text-left group">
                    <div class="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                        <i data-lucide="briefcase" class="w-6 h-6"></i>
                    </div>
                    <h4 class="font-bold text-slate-800 mb-1">Data Pekerjaan</h4>
                    <p class="text-sm text-slate-500">Informasikan status karir atau usaha Anda saat ini.</p>
                </button>
                <button onclick="ui.navigate('survey')" class="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-blue-500 transition-all text-left group">
                    <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <i data-lucide="clipboard-list" class="w-6 h-6"></i>
                    </div>
                    <h4 class="font-bold text-slate-800 mb-1">Isi Kuesioner</h4>
                    <p class="text-sm text-slate-500">Berikan umpan balik relevansi pendidikan dengan dunia kerja.</p>
                </button>
            </div>
        </div>
    `,
    alumniProfile: () => `
        <div class="max-w-4xl mx-auto space-y-6 fade-in">
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                    <i data-lucide="user-cog" class="w-6 h-6 text-blue-600"></i> Informasi Dasar & Kontak
                </h3>
                <form class="space-y-4" onsubmit="event.preventDefault(); alert('Profil berhasil diperbarui!');">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                            <input type="text" class="w-full px-4 py-2 rounded-lg border border-slate-200" value="${state.user.name}">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input type="email" class="w-full px-4 py-2 rounded-lg border border-slate-200" placeholder="email@contoh.com">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">No. HP / WhatsApp</label>
                            <input type="tel" class="w-full px-4 py-2 rounded-lg border border-slate-200" placeholder="0812xxxx">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Tahun Lulus</label>
                            <input type="number" class="w-full px-4 py-2 rounded-lg border border-slate-200" value="2023">
                        </div>
                    </div>
                    
                    <h4 class="font-bold text-slate-700 mt-8 mb-4">Media Sosial</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="relative">
                            <span class="absolute left-3 top-2.5 text-slate-400"><i data-lucide="linkedin" class="w-4 h-4"></i></span>
                            <input type="text" class="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200" placeholder="URL LinkedIn">
                        </div>
                        <div class="relative">
                            <span class="absolute left-3 top-2.5 text-slate-400"><i data-lucide="instagram" class="w-4 h-4"></i></span>
                            <input type="text" class="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200" placeholder="Username Instagram">
                        </div>
                        <div class="relative">
                            <span class="absolute left-3 top-2.5 text-slate-400"><i data-lucide="facebook" class="w-4 h-4"></i></span>
                            <input type="text" class="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200" placeholder="Username Facebook">
                        </div>
                        <div class="relative">
                            <span class="absolute left-3 top-2.5 text-slate-400"><i data-lucide="video" class="w-4 h-4"></i></span>
                            <input type="text" class="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200" placeholder="Username TikTok">
                        </div>
                    </div>

                    <button type="submit" class="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-6 shadow-md shadow-blue-100">
                        Simpan Perubahan Profil
                    </button>
                </form>
            </div>
        </div>
    `,
    alumniJob: () => `
        <div class="max-w-4xl mx-auto space-y-6 fade-in">
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                    <i data-lucide="briefcase" class="w-6 h-6 text-blue-600"></i> Detail Pekerjaan
                </h3>
                <form class="space-y-4" onsubmit="event.preventDefault(); alert('Data pekerjaan berhasil disimpan!');">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Status Pekerjaan</label>
                            <select class="w-full px-4 py-2 rounded-lg border border-slate-200">
                                <option>PNS</option>
                                <option>Swasta</option>
                                <option>Wirausaha</option>
                                <option>Mencari Kerja</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Posisi / Jabatan</label>
                            <input type="text" class="w-full px-4 py-2 rounded-lg border border-slate-200" placeholder="Contoh: Manager">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Nama Tempat Bekerja</label>
                            <input type="text" class="w-full px-4 py-2 rounded-lg border border-slate-200" placeholder="Nama Perusahaan/Instansi">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Sosial Media Tempat Bekerja</label>
                            <input type="text" class="w-full px-4 py-2 rounded-lg border border-slate-200" placeholder="IG/LinkedIn Perusahaan">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Alamat Tempat Bekerja</label>
                        <textarea class="w-full px-4 py-2 rounded-lg border border-slate-200" rows="2" placeholder="Alamat lengkap kantor"></textarea>
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-4">
                        Simpan Data Pekerjaan
                    </button>
                </form>
            </div>
        </div>
    `,
    alumniSurvey: () => `
        <div class="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 fade-in">
            <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                <i data-lucide="clipboard-check" class="w-6 h-6 text-blue-600"></i> Kuesioner Pelacakan Alumni
            </h3>
            <form class="space-y-6" onsubmit="event.preventDefault(); alert('Terima kasih! Kuesioner telah terkirim.');">
                <div class="space-y-3">
                    <p class="font-medium text-slate-700">1. Seberapa relevan pekerjaan Anda saat ini dengan bidang studi di kampus?</p>
                    <div class="grid grid-cols-2 gap-2">
                        <label class="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                            <input type="radio" name="q1" class="text-blue-600"> Sangat Relevan
                        </label>
                        <label class="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                            <input type="radio" name="q1" class="text-blue-600"> Relevan
                        </label>
                        <label class="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                            <input type="radio" name="q1" class="text-blue-600"> Cukup Relevan
                        </label>
                        <label class="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                            <input type="radio" name="q1" class="text-blue-600"> Tidak Relevan
                        </label>
                    </div>
                </div>
                <div class="space-y-3">
                    <p class="font-medium text-slate-700">2. Berapa lama waktu yang Anda butuhkan untuk mendapatkan pekerjaan pertama setelah lulus?</p>
                    <select class="w-full px-4 py-2 rounded-lg border border-slate-200">
                        <option>< 3 bulan</option>
                        <option>3 - 6 bulan</option>
                        <option>6 - 12 bulan</option>
                        <option>> 12 bulan</option>
                    </select>
                </div>
                <div class="space-y-3">
                    <p class="font-medium text-slate-700">3. Apa kendala terbesar Anda dalam mencari kerja? (Opsional)</p>
                    <textarea class="w-full px-4 py-2 rounded-lg border border-slate-200" rows="3" placeholder="Tuliskan kendala Anda..."></textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Kirim Jawaban
                </button>
            </form>
        </div>
    `,

    // Admin Components
    adminAlumni: () => `
        <div class="space-y-6 fade-in">
            <!-- Sheet Link & Search -->
            <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div class="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 w-full md:w-96">
                    <i data-lucide="search" class="w-5 h-5 text-slate-400"></i>
                    <input type="text" placeholder="Cari alumni (Nama, Instansi, Posisi)..." class="w-full focus:outline-none text-sm text-slate-700">
                </div>
                <a href="https://docs.google.com/spreadsheets/d/1JepgHxbtFpfwAxUO3DjZd6-TOpvtCr2d/edit?pli=1&gid=1674223372#gid=1674223372" target="_blank" class="flex items-center gap-2 px-4 py-2.5 bg-green-50 text-green-700 border border-green-200 rounded-xl hover:bg-green-100 transition-colors font-medium text-sm">
                    <i data-lucide="file-spreadsheet" class="w-4 h-4"></i>
                    Buka Spreadsheet Asli
                </a>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 class="text-xl font-bold text-slate-800">Data Lengkap Alumni</h3>
                    <div class="flex gap-2">
                        <button class="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 flex items-center gap-2">
                            <i data-lucide="download" class="w-4 h-4"></i> Export CSV
                        </button>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 flex items-center gap-2">
                            <i data-lucide="plus" class="w-4 h-4"></i> Tambah Data
                        </button>
                    </div>
                </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                        <tr>
                            <th class="px-6 py-4 font-semibold">Alumni</th>
                            <th class="px-6 py-4 font-semibold">Kontak & Sosmed</th>
                            <th class="px-6 py-4 font-semibold">Pekerjaan</th>
                            <th class="px-6 py-4 font-semibold">Lokasi Kerja</th>
                            <th class="px-6 py-4 font-semibold text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-sm">
                        ${state.alumniData.map(a => `
                            <tr class="hover:bg-slate-50/80 transition-colors">
                                <td class="px-6 py-4">
                                    <div class="font-bold text-slate-800">${a.name}</div>
                                    <div class="text-slate-500 text-xs">Lulus ${a.year}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-slate-700 font-medium">${a.email}</div>
                                    <div class="text-slate-500 text-xs mb-2">${a.phone}</div>
                                    <div class="flex gap-2">
                                        ${a.socials.linkedin !== '-' ? '<i data-lucide="linkedin" class="w-3.5 h-3.5 text-blue-600"></i>' : ''}
                                        ${a.socials.ig !== '-' ? '<i data-lucide="instagram" class="w-3.5 h-3.5 text-pink-600"></i>' : ''}
                                        ${a.socials.fb !== '-' ? '<i data-lucide="facebook" class="w-3.5 h-3.5 text-blue-800"></i>' : ''}
                                        ${a.socials.tiktok !== '-' ? '<i data-lucide="video" class="w-3.5 h-3.5 text-slate-800"></i>' : ''}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="font-semibold text-slate-800">${a.position}</div>
                                    <div class="text-slate-600">${a.company}</div>
                                    <span class="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                        a.status === 'PNS' ? 'bg-purple-100 text-purple-700' : 
                                        a.status === 'Swasta' ? 'bg-blue-100 text-blue-700' : 
                                        a.status === 'Wirausaha' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                    }">${a.status}</span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-slate-600 max-w-[200px] truncate">${a.workAddress}</div>
                                    <div class="text-blue-600 text-xs italic">${a.workSocials}</div>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex justify-end gap-2">
                                        <button class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
                                        <button class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `,
    adminReports: () => `
        <div class="space-y-8 fade-in">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                        <i data-lucide="users" class="w-6 h-6"></i>
                    </div>
                    <p class="text-sm text-slate-500 font-medium">Total Alumni</p>
                    <p class="text-2xl font-bold text-slate-800">1,240</p>
                </div>
                <div class="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div class="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                        <i data-lucide="check-circle" class="w-6 h-6"></i>
                    </div>
                    <p class="text-sm text-slate-500 font-medium">Responden</p>
                    <p class="text-2xl font-bold text-slate-800">856</p>
                </div>
                <div class="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div class="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                        <i data-lucide="briefcase" class="w-6 h-6"></i>
                    </div>
                    <p class="text-sm text-slate-500 font-medium">Bekerja</p>
                    <p class="text-2xl font-bold text-slate-800">720</p>
                </div>
                <div class="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div class="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                        <i data-lucide="trending-up" class="w-6 h-6"></i>
                    </div>
                    <p class="text-sm text-slate-500 font-medium">Rerata Gaji</p>
                    <p class="text-2xl font-bold text-slate-800">6.5jt</p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h4 class="text-lg font-bold mb-6 text-slate-800">Relevansi Pekerjaan</h4>
                    <canvas id="relevanceChart" height="250"></canvas>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h4 class="text-lg font-bold mb-6 text-slate-800">Sebaran Gaji Alumni</h4>
                    <canvas id="salaryChart" height="250"></canvas>
                </div>
            </div>
        </div>
    `
};

// Auth Logic
const auth = {
    login: (role) => {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const errorBox = document.getElementById('login-error');
        const errorMessage = document.getElementById('error-message');

        // Reset error state
        errorBox.classList.add('hidden');

        // Validation for Empty Fields
        if (!username || !password) {
            errorMessage.innerText = 'Username dan Password wajib diisi!';
            errorBox.classList.remove('hidden');
            lucide.createIcons();
            return;
        }

        if (role === 'admin') {
            // Strict Admin Validation
            if (username === 'admin' && password === 'admin') {
                state.user = { role: 'admin', name: 'Administrator' };
            } else {
                errorMessage.innerText = 'Username atau Password Admin salah!';
                errorBox.classList.remove('hidden');
                lucide.createIcons();
                return;
            }
        } else {
            // Alumni Validation (Any name/pass works as long as not empty)
            state.user = { role: 'alumni', name: username };
        }
        
        document.getElementById('login-view').classList.add('hidden');
        document.getElementById('dashboard-view').classList.remove('hidden');
        
        // Clear inputs for next time
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
        
        ui.initDashboard();
    },
    logout: () => {
        state.user = null;
        document.getElementById('login-view').classList.remove('hidden');
        document.getElementById('dashboard-view').classList.add('hidden');
        // Hide error box on logout
        document.getElementById('login-error').classList.add('hidden');
    }
};

// UI Logic
const ui = {
    initDashboard: () => {
        const nav = document.getElementById('sidebar-nav');
        const roleBadge = document.getElementById('user-role-badge');
        
        roleBadge.innerText = state.user.role;
        roleBadge.className = `px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
            state.user.role === 'admin' ? 'bg-slate-800 text-white' : 'bg-blue-100 text-blue-700'
        }`;

        const menuItems = state.user.role === 'admin' ? [
            { id: 'reports', icon: 'pie-chart', label: 'Laporan & Statistik' },
            { id: 'alumni', icon: 'users', label: 'Kelola Alumni' },
        ] : [
            { id: 'home', icon: 'home', label: 'Beranda' },
            { id: 'profile', icon: 'user-circle', label: 'Update Profil' },
            { id: 'job', icon: 'briefcase', label: 'Data Pekerjaan' },
            { id: 'survey', icon: 'clipboard-list', label: 'Kuesioner' },
        ];

        nav.innerHTML = menuItems.map(item => `
            <button onclick="ui.navigate('${item.id}')" id="nav-${item.id}" class="nav-btn flex items-center gap-3 w-full px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-all">
                <i data-lucide="${item.icon}" class="w-5 h-5"></i>
                <span class="font-medium">${item.label}</span>
            </button>
        `).join('');

        lucide.createIcons();
        ui.navigate(menuItems[0].id);
    },

    navigate: (viewId) => {
        const content = document.getElementById('content-area');
        const title = document.getElementById('page-title');
        
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('bg-blue-50', 'text-blue-600');
        });
        const activeBtn = document.getElementById(`nav-${viewId}`);
        if (activeBtn) activeBtn.classList.add('bg-blue-50', 'text-blue-600');

        // Render content
        switch(viewId) {
            case 'home':
                title.innerText = 'Beranda Dashboard';
                content.innerHTML = components.alumniHome();
                break;
            case 'profile':
                title.innerText = 'Profil Alumni';
                content.innerHTML = components.alumniProfile();
                break;
            case 'job':
                title.innerText = 'Data Pekerjaan';
                content.innerHTML = components.alumniJob();
                break;
            case 'survey':
                title.innerText = 'Kuesioner';
                content.innerHTML = components.alumniSurvey();
                break;
            case 'alumni':
                title.innerText = 'Kelola Data Alumni';
                content.innerHTML = components.adminAlumni();
                break;
            case 'reports':
                title.innerText = 'Laporan & Statistik';
                content.innerHTML = components.adminReports();
                ui.renderCharts();
                break;
        }
        lucide.createIcons();
    },

    renderCharts: () => {
        const relevanceCtx = document.getElementById('relevanceChart');
        if (relevanceCtx) {
            new Chart(relevanceCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Sangat Relevan', 'Relevan', 'Cukup', 'Tidak'],
                    datasets: [{
                        data: state.questionnaireStats.relevance,
                        backgroundColor: ['#2563eb', '#60a5fa', '#94a3b8', '#e2e8f0']
                    }]
                },
                options: { plugins: { legend: { position: 'bottom' } } }
            });
        }

        const salaryCtx = document.getElementById('salaryChart');
        if (salaryCtx) {
            new Chart(salaryCtx, {
                type: 'bar',
                data: {
                    labels: ['>10jt', '5-10jt', '3-5jt', '<3jt'],
                    datasets: [{
                        label: 'Persentase Alumni',
                        data: state.questionnaireStats.salary,
                        backgroundColor: '#2563eb'
                    }]
                },
                options: { 
                    scales: { y: { beginAtZero: true, max: 100 } },
                    plugins: { legend: { display: false } }
                }
            });
        }
    }
};

// Initial state
lucide.createIcons();
