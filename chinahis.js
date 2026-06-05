
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>关键词触发：唐史回忆录</title>
    <style>
        *{margin:0;padding:0;box-sizing:border-box;font-family:"微软雅黑","PingFang SC",宋体,sans-serif}
        body{max-width:750px;margin:0 auto;padding:20px;background:#f6f3ec;min-height:100vh}
        .box{background:#fff;padding:30px;border-radius:12px;box-shadow:0 2px 16px rgba(0,0,0,0.08);margin-bottom:20px}
        .game-title{text-align:center;margin-bottom:20px}
        .game-title h1{color:#6b3a2a;font-size:24px;letter-spacing:2px;margin-bottom:4px}
        .game-title .subtitle{color:#a0522d;font-size:13px;letter-spacing:4px}
        .home-page .section-title{color:#6b3a2a;font-size:16px;margin-bottom:14px;border-left:3px solid #a0522d;padding-left:12px}
        .category-grid{display:flex;flex-direction:column;gap:10px;margin-bottom:24px}
        .category-card{display:flex;justify-content:space-between;align-items:center;padding:16px 18px;background:#fdf8f0;border:2px solid #d4b896;border-radius:10px;cursor:pointer;transition:all 0.2s}
        .category-card:hover{background:#fdf3d6;border-color:#b8956e;transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,0.08)}
        .category-card .cat-name{font-size:16px;font-weight:bold;color:#6b3a2a}
        .category-card .cat-stats{font-size:12px;color:#999;margin-top:4px}
        .category-card .cat-badge{background:#a0522d;color:#fff;padding:6px 14px;border-radius:20px;font-size:13px;white-space:nowrap}
        .quick-actions{display:flex;gap:10px;margin-top:16px}
        .quick-actions button{flex:1;padding:12px;background:#a0522d;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer;letter-spacing:1px;transition:background 0.2s}
        .quick-actions button:hover{background:#8b4513}
        .quick-actions button.outline{background:#fff;color:#a0522d;border:2px solid #a0522d}
        .quick-actions button.outline:hover{background:#fdf3d6}
        .game-page{display:none}
        .game-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px}
        .back-btn{padding:8px 16px;background:#fff;color:#a0522d;border:2px solid #a0522d;border-radius:20px;font-size:13px;cursor:pointer;transition:all 0.2s}
        .back-btn:hover{background:#fdf3d6}
        .game-progress{font-size:13px;color:#999}
        .game-progress span{color:#a0522d;font-weight:bold}
        .keyword-card{text-align:center;padding:40px 20px;background:#fdf8f0;border:2px solid #d4b896;border-radius:12px;margin-bottom:20px}
        .keyword-card .label{font-size:12px;color:#a0522d;letter-spacing:3px;margin-bottom:12px}
        .keyword-card .keyword{font-size:36px;font-weight:bold;color:#6b3a2a;letter-spacing:3px;margin-bottom:16px}
        .keyword-card .hint{font-size:14px;color:#999;line-height:1.8}
        .answer-area{display:none;margin-top:20px;padding:0;background:#fffdf7;border:2px solid #d4b896;border-radius:12px;animation:fadeIn 0.4s ease-in;overflow:hidden}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .answer-header{background:#fdf3d6;padding:14px 20px;border-bottom:1px solid #d4b896;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}
        .answer-header .header-left{display:flex;align-items:center;gap:8px}
        .answer-header .icon{font-size:22px}
        .answer-header h4{color:#6b3a2a;font-size:16px;margin:0}
        .mode-toggle{display:flex;gap:4px}
        .mode-toggle button{padding:6px 14px;border:2px solid #d4b896;border-radius:20px;font-size:12px;cursor:pointer;letter-spacing:1px;transition:all 0.2s;background:#fff;color:#a0522d}
        .mode-toggle button.active{background:#a0522d;color:#fff;border-color:#a0522d}
        .answer-body{padding:20px}
        .answer-body .kd-block{margin-bottom:16px}
        .answer-body .kd-block:last-child{margin-bottom:0}
        .answer-body .kd-label{display:inline-block;background:#fdf3d6;color:#6b3a2a;font-weight:bold;font-size:12px;padding:4px 12px;border-radius:20px;margin-bottom:8px;letter-spacing:1px}
        .answer-body .kd-list{list-style:none;padding:0;margin:4px 0 0 0}
        .answer-body .kd-list li{padding:5px 0 5px 20px;position:relative;line-height:1.8;color:#555;font-size:15px}
        .answer-body .kd-list li::before{content:"•";position:absolute;left:3px;color:#a0522d;font-weight:bold}
        .answer-body .kd-list li.sub{padding-left:34px;font-size:14px;color:#777}
        .answer-body .kd-list li.sub::before{content:"◦";left:17px;color:#c9a96e}
        .answer-body .kd-text{line-height:1.9;color:#555;font-size:15px}
        .answer-body .kd-note{margin-top:12px;padding:12px 16px;background:#fff9ed;border-left:4px solid #d4a030;border-radius:6px;font-style:italic;color:#8b6914;font-size:14px;line-height:1.8}
        .answer-body .kd-note .note-label{font-style:normal;font-weight:bold;color:#a0522d;font-size:11px;letter-spacing:2px;display:block;margin-bottom:4px}
        /* 填空模式 */
        .blank{display:inline-block;min-width:60px;border-bottom:2px dashed #a0522d;padding:2px 8px;margin:0 2px;cursor:pointer;color:transparent;transition:all 0.3s;background:#fdf3d6;border-radius:3px;text-align:center}
        .blank.revealed{color:#a0522d;font-weight:bold;border-bottom:2px solid #2e7d32;background:#e8f5e9;cursor:default}
        .blank:hover:not(.revealed){background:#fdf0d0;border-bottom-color:#8b4513}
        .blank-hint{font-size:11px;color:#c9a96e;margin-left:4px;font-style:italic}
        .self-eval{display:none;margin-top:18px}
        .self-eval .eval-title{font-size:14px;color:#555;margin-bottom:10px;text-align:center}
        .eval-btns{display:flex;gap:10px}
        .eval-btns button{flex:1;padding:12px;border:none;border-radius:8px;font-size:14px;cursor:pointer;letter-spacing:1px;transition:all 0.2s}
        .eval-btns .btn-full{background:#2e7d32;color:#fff}
        .eval-btns .btn-full:hover{background:#388e3c}
        .eval-btns .btn-partial{background:#d4a030;color:#fff}
        .eval-btns .btn-partial:hover{background:#e0b040}
        .eval-btns .btn-forgot{background:#a0522d;color:#fff}
        .eval-btns .btn-forgot:hover{background:#8b4513}
        .stats-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:100;justify-content:center;align-items:center}
        .stats-overlay.show{display:flex}
        .stats-box{background:#fff;padding:30px;border-radius:12px;max-width:500px;width:90%;max-height:80vh;overflow-y:auto}
        .stats-box h3{color:#6b3a2a;margin-bottom:16px;text-align:center}
        .stats-box .stat-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0e8d8;font-size:14px}
        .stats-box .stat-row .stat-name{color:#555}
        .stats-box .stat-row .stat-val{color:#a0522d;font-weight:bold}
        .stats-box button{margin-top:16px;width:100%;padding:12px;background:#a0522d;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer}
        .mastery-dots{display:flex;gap:4px;margin-top:6px}
        .mastery-dots .dot{width:8px;height:8px;border-radius:50%;background:#ddd}
        .mastery-dots .dot.filled{background:#2e7d32}
        .mastery-dots .dot.partial{background:#d4a030}
        .dot-legend{display:flex;gap:16px;font-size:11px;color:#999;margin-top:8px;align-items:center}
        .dot-legend span{display:flex;align-items:center;gap:4px}
        .dot-legend .dot{width:8px;height:8px;border-radius:50%}
        .dot-legend .dot.green{background:#2e7d32}
        .dot-legend .dot.yellow{background:#d4a030}
        .dot-legend .dot.gray{background:#ddd}
        .kd-table{width:100%;border-collapse:collapse;margin:8px 0;font-size:14px}
        .kd-table th{background:#fdf3d6;color:#6b3a2a;padding:8px 12px;text-align:center;font-weight:bold;border:1px solid #d4b896}
        .kd-table td{padding:8px 12px;border:1px solid #d4b896;color:#555;line-height:1.6}
        .kd-table td:first-child{font-weight:bold;color:#6b3a2a;text-align:center;background:#fdf8f0}
    </style>
</head>
<body>
<div class="box" id="game-box">
<div class="home-page" id="home-page">
    <div class="game-title"><h1>关键词触发：唐史回忆录</h1><div class="subtitle">开元之治 · 主动回忆 · 间隔重复</div></div>
    <div class="section-title">📂 选择一个领域开始练习</div>
    <div class="category-grid" id="category-grid"></div>
    <div class="dot-legend"><span><div class="dot green"></div>掌握</span><span><div class="dot yellow"></div>部分</span><span><div class="dot gray"></div>未学</span></div>
    <div class="quick-actions">
        <button onclick="startRandom()">🎲 随机领域</button>
        <button onclick="startWeakest()">🎯 弱项优先</button>
        <button class="outline" onclick="showStats()">📊 掌握统计</button>
    </div>
</div>
<div class="game-page" id="game-page">
    <div class="game-header"><button class="back-btn" onclick="goHome()">← 返回主页</button><div class="game-progress" id="game-progress"></div></div>
    <div class="keyword-card" id="keyword-card">
        <div class="label" id="kw-label"></div>
        <div class="keyword" id="kw-keyword"></div>
        <div class="hint" id="kw-hint"></div>
        <button id="reveal-btn" onclick="revealAnswer()" style="margin-top:20px;padding:12px 30px;background:#a0522d;color:#fff;border:none;border-radius:8px;font-size:15px;cursor:pointer;letter-spacing:1px;">📜 揭晓答案</button>
    </div>
    <div class="answer-area" id="answer-area">
        <div class="answer-header">
            <div class="header-left"><span class="icon">📜</span><h4 id="answer-title"></h4></div>
            <div class="mode-toggle">
                <button id="mode-fill" class="active" onclick="switchMode('fill')">✏️ 填空挑战</button>
                <button id="mode-full" onclick="switchMode('full')">📋 完整笔记</button>
            </div>
        </div>
        <div class="answer-body" id="answer-body"></div>
    </div>
    <div class="self-eval" id="self-eval">
        <div class="eval-title">你记得多少？</div>
        <div class="eval-btns">
            <button class="btn-full" onclick="selfEval('full')">✅ 完全记得</button>
            <button class="btn-partial" onclick="selfEval('partial')">⚠ 部分记得</button>
            <button class="btn-forgot" onclick="selfEval('forgot')">❌ 基本忘了</button>
        </div>
    </div>
</div>
</div>
<div class="stats-overlay" id="stats-overlay"><div class="stats-box" id="stats-box"></div></div>

<script>
// ==================== 关键词库（严格按笔记顺序，含填空版本） ====================
const categories = [{
    id: "bg",
    name: "一、开元之治的背景",
    icon: "📖",
    keywords: [{
        keyword: "开元之治前的政局",
        hint: "从太宗到玄宗即位前，经历了哪些动荡？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">历史脉络</span>
            <ul class="kd-list">
            <li>太宗死后，高宗即位，遵守太宗遗训——史称<strong>永徽之治</strong></li>
            <li>高宗中年以后，<strong>武后渐掌大权</strong></li>
            <li>高宗死后，武后先后废中宗和睿宗，自称<strong>则天皇帝</strong>，改国号为<strong>周</strong></li>
            <li>武则天死后，又有<strong>韦后、安乐公主、太平公主</strong>干政，政局动荡</li>
            <li>玄宗即位后，<strong>励精图治</strong>，史称<strong>开元之治</strong></li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>太宗死后，高宗即位，史称永徽之治。武后渐掌大权，自称则天皇帝，改国号为周。武则天死后，韦后、安乐公主、太平公主干政，政局动荡。玄宗即位后励精图治，史称开元之治。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">历史脉络</span>
            <ul class="kd-list">
            <li>太宗死后，高宗即位，遵守太宗遗训——史称<span class="blank" onclick="this.classList.add('revealed')">永徽之治</span></li>
            <li>高宗中年以后，<span class="blank" onclick="this.classList.add('revealed')">武后渐掌大权</span></li>
            <li>高宗死后，武后先后废中宗和睿宗，自称<span class="blank" onclick="this.classList.add('revealed')">则天皇帝</span>，改国号为<span class="blank" onclick="this.classList.add('revealed')">周</span></li>
            <li>武则天死后，又有<span class="blank" onclick="this.classList.add('revealed')">韦后、安乐公主、太平公主</span>干政，政局动荡</li>
            <li>玄宗即位后，<span class="blank" onclick="this.classList.add('revealed')">励精图治</span>，史称<span class="blank" onclick="this.classList.add('revealed')">开元之治</span></li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>太宗死后，高宗即位，史称永徽之治。武后渐掌大权，自称则天皇帝，改国号为周。武则天死后，韦后、安乐公主、太平公主干政，政局动荡。玄宗即位后励精图治，史称开元之治。</div>`
    }]
}, {
    id: "politics",
    name: "二、政治方面",
    icon: "🏛️",
    keywords: [{
        keyword: "裁汰冗官，革新科举",
        hint: "武后时期的冗官问题有多严重？玄宗如何解决？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">背景</span>
            <ul class="kd-list"><li>武后大开科举，又设<strong>荫子、制科</strong></li><li>韦武当政时<strong>卖官鬻爵</strong></li><li>京官人数较太宗时倍增，冗官充斥</li></ul></div>
            <div class="kd-block"><span class="kd-label">措施</span>
            <ul class="kd-list"><li>规定明经、进士科每年及第人数<strong>不超过一百人</strong></li><li>及第后须经<strong>吏部铨选</strong>方可授官</li><li>裁汰冗官，亲自考核县令，罢免不合格者</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><p class="kd-text">纾缓冗官充斥问题，提升官吏质素，减少俸禄开支。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>武后大开科举，韦武当政时卖官鬻爵。玄宗规定明经、进士科每年及第不超过一百人，及第后须经吏部铨选。裁汰冗官，亲自考核县令。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">背景</span>
            <ul class="kd-list"><li>武后大开科举，又设<span class="blank" onclick="this.classList.add('revealed')">荫子、制科</span></li><li>韦武当政时<span class="blank" onclick="this.classList.add('revealed')">卖官鬻爵</span></li><li>京官人数较太宗时倍增，冗官充斥</li></ul></div>
            <div class="kd-block"><span class="kd-label">措施</span>
            <ul class="kd-list"><li>规定明经、进士科每年及第人数<span class="blank" onclick="this.classList.add('revealed')">不超过一百人</span></li><li>及第后须经<span class="blank" onclick="this.classList.add('revealed')">吏部铨选</span>方可授官</li><li>裁汰冗官，亲自考核县令，罢免不合格者</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><p class="kd-text">纾缓冗官充斥问题，提升官吏质素，减少俸禄开支。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>武后大开科举，韦武当政时卖官鬻爵。玄宗规定明经、进士科每年及第不超过一百人，及第后须经吏部铨选。裁汰冗官，亲自考核县令。</div>`
    }, {
        keyword: "恢复三省权力",
        hint: "武后时期三省出了什么问题？玄宗如何恢复？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">背景</span><p class="kd-text">武后任用私人，政令不经三省，三省形同虚设。</p></div>
            <div class="kd-block"><span class="kd-label">措施</span>
            <ul class="kd-list"><li>恢复三省长官职权，使政令重归<strong>中书门下</strong></li><li>限制宰相人数在<strong>三人以内</strong>，加快决策效率</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><p class="kd-text">纠正武韦以来任用私人的弊端，恢复三省制衡功能。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>武后任用私人，政令不经三省。玄宗恢复三省长官职权，限制宰相人数在三人以内。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">背景</span><p class="kd-text">武后任用私人，政令不经三省，三省<span class="blank" onclick="this.classList.add('revealed')">形同虚设</span>。</p></div>
            <div class="kd-block"><span class="kd-label">措施</span>
            <ul class="kd-list"><li>恢复三省长官职权，使政令重归<span class="blank" onclick="this.classList.add('revealed')">中书门下</span></li><li>限制宰相人数在<span class="blank" onclick="this.classList.add('revealed')">三人以内</span>，加快决策效率</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><p class="kd-text">纠正武韦以来任用私人的弊端，恢复三省制衡功能。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>武后任用私人，政令不经三省。玄宗恢复三省长官职权，限制宰相人数在三人以内。</div>`
    }, {
        keyword: "任贤纳谏",
        hint: "开元时期的贤相有哪些？各有什么特点？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">措施</span>
            <ul class="kd-list"><li>恢复贞观时期<strong>谏官议政之制</strong>——宰相与皇帝议政时，谏官随从左右</li><li>先后任用姚崇、宋璟、张九龄等贤相</li></ul></div>
            <div class="kd-block"><span class="kd-label">名臣特点</span>
            <ul class="kd-list"><li><strong>姚崇</strong>——通达时变，多谋善断，提出「十事要说」</li><li><strong>宋璟</strong>——刚直不阿，刑赏无私</li><li><strong>张九龄</strong>——老成务实，勤于政事</li><li><strong>韩休</strong>——敢言直谏</li><li><strong>张说</strong>——开元名臣</li></ul></div>
            <div class="kd-block"><span class="kd-label">局限</span><p class="kd-text">韩休拜相后，被<strong>李林甫</strong>表面讨好所蒙蔽，推荐其入相，为日后朝政败坏埋下伏笔。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>恢复谏官议政之制。任用姚崇、宋璟、张九龄等贤相。姚崇提出「十事要说」，宋璟刚直不阿。韩休推荐李林甫入相埋下伏笔。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">措施</span>
            <ul class="kd-list"><li>恢复贞观时期<span class="blank" onclick="this.classList.add('revealed')">谏官议政之制</span>——宰相与皇帝议政时，谏官随从左右</li><li>先后任用<span class="blank" onclick="this.classList.add('revealed')">姚崇、宋璟、张九龄</span>等贤相</li></ul></div>
            <div class="kd-block"><span class="kd-label">名臣特点</span>
            <ul class="kd-list"><li><span class="blank" onclick="this.classList.add('revealed')">姚崇</span>——通达时变，多谋善断，提出<span class="blank" onclick="this.classList.add('revealed')">「十事要说」</span></li><li><span class="blank" onclick="this.classList.add('revealed')">宋璟</span>——刚直不阿，刑赏无私</li><li><span class="blank" onclick="this.classList.add('revealed')">张九龄</span>——老成务实，勤于政事</li><li>韩休——敢言直谏</li></ul></div>
            <div class="kd-block"><span class="kd-label">局限</span><p class="kd-text">韩休被<span class="blank" onclick="this.classList.add('revealed')">李林甫</span>表面讨好所蒙蔽，推荐其入相，为日后朝政败坏埋下伏笔。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>恢复谏官议政之制。任用姚崇、宋璟、张九龄等贤相。姚崇提出「十事要说」，宋璟刚直不阿。韩休推荐李林甫入相埋下伏笔。</div>`
    }, {
        keyword: "整顿吏治",
        hint: "武后时期吏治有什么问题？玄宗如何整顿？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">背景</span>
            <ul class="kd-list"><li>武后时期官员唯命是从，不顾气节（如<strong>娄师德</strong>位居宰相却宁愿唾面自干以自保）</li><li>前朝弊政：<strong>重京官轻外任</strong>，地方吏治较差</li></ul></div>
            <div class="kd-block"><span class="kd-label">措施</span>
            <ul class="kd-list"><li>实行<strong>京官与地方官互调</strong></li><li>政绩优秀的地方官<strong>选拔入朝为相</strong>（如姚崇、宋璟）</li><li>设<strong>十五道采访使</strong>，考察地方官政绩</li><li>罢免无气节的官员（如崔日用）</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><p class="kd-text">改善地方吏治，巩固基层政治；加强中央与地方关系。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>实行京官与地方官互调。设十五道采访使考察地方官政绩。罢免无气节官员。改善地方吏治。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">背景</span>
            <ul class="kd-list"><li>武后时期官员唯命是从——如<span class="blank" onclick="this.classList.add('revealed')">娄师德</span>位居宰相却宁愿唾面自干</li><li>前朝弊政：<span class="blank" onclick="this.classList.add('revealed')">重京官轻外任</span>，地方吏治较差</li></ul></div>
            <div class="kd-block"><span class="kd-label">措施</span>
            <ul class="kd-list"><li>实行<span class="blank" onclick="this.classList.add('revealed')">京官与地方官互调</span></li><li>设<span class="blank" onclick="this.classList.add('revealed')">十五道采访使</span>，考察地方官政绩，奖善罚贪</li><li>罢免无气节的官员（如<span class="blank" onclick="this.classList.add('revealed')">崔日用</span>）</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><p class="kd-text">改善地方吏治，巩固基层政治；加强中央与地方关系。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>实行京官与地方官互调。设十五道采访使考察地方官政绩。罢免无气节官员。改善地方吏治。</div>`
    }]
}, {
    id: "economy",
    name: "三、经济方面",
    icon: "💰",
    keywords: [{
        keyword: "崇尚节俭",
        hint: "武韦时期的风气如何？玄宗如何扭转？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">背景</span><p class="kd-text">武韦时期滥赏滥赐，浮华贪纵之风渐生。</p></div>
            <div class="kd-block"><span class="kd-label">措施</span>
            <ul class="kd-list"><li>玄宗即位之初自奉甚俭</li><li>禁止三品以下朝臣和后妃<strong>穿戴锦衣玉帛、珠玉配饰</strong></li><li>禁止各地开采珠玉、制造锦绣</li><li><strong>遣散宫女</strong>，节省宫廷开支</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><p class="kd-text">一改武韦以来的奢华风气，节省财政开支。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>玄宗即位之初自奉甚俭。禁止三品以下穿戴锦衣玉帛。遣散宫女节省宫廷开支。一改武韦奢华风气。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">背景</span><p class="kd-text">武韦时期滥赏滥赐，浮华贪纵之风渐生。</p></div>
            <div class="kd-block"><span class="kd-label">措施</span>
            <ul class="kd-list"><li>禁止三品以下朝臣和后妃<span class="blank" onclick="this.classList.add('revealed')">穿戴锦衣玉帛、珠玉配饰</span></li><li>禁止各地开采珠玉、制造锦绣</li><li><span class="blank" onclick="this.classList.add('revealed')">遣散宫女</span>，节省宫廷开支</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><p class="kd-text">一改武韦以来的奢华风气，节省财政开支。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>玄宗即位之初自奉甚俭。禁止三品以下穿戴锦衣玉帛。遣散宫女节省宫廷开支。</div>`
    }, {
        keyword: "清查户口",
        hint: "逃户问题有多严重？宇文融如何清查？成效如何？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">背景</span><ul class="kd-list"><li>官员贪渎，兼并土地</li><li>百姓失去土地仍要纳租，逃户甚多</li><li>户籍失修</li></ul></div>
            <div class="kd-block"><span class="kd-label">措施</span><ul class="kd-list"><li>玄宗派<strong>宇文融</strong>清查户口和田地</li><li>重新附籍的逃户<strong>免除六年赋役</strong></li><li>将<strong>八十多万隐户</strong>重入国家户籍系统</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><ul class="kd-list"><li>查出大量逃户和农地，国家税收充足</li><li>人口由唐初二百万户上升至<strong>开元时七百万户</strong></li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>派宇文融清查户口和田地。逃户免除六年赋役。将八十多万隐户重入户籍。人口由二百万户升至七百万户。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">背景</span><ul class="kd-list"><li>官员贪渎，兼并土地</li><li>百姓失去土地仍要纳租，逃户甚多</li><li>户籍失修</li></ul></div>
            <div class="kd-block"><span class="kd-label">措施</span><ul class="kd-list"><li>玄宗派<span class="blank" onclick="this.classList.add('revealed')">宇文融</span>清查户口和田地</li><li>重新附籍的逃户<span class="blank" onclick="this.classList.add('revealed')">免除六年赋役</span></li><li>将<span class="blank" onclick="this.classList.add('revealed')">八十多万隐户</span>重入户籍</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><ul class="kd-list"><li>查出大量逃户和农地，国家税收充足</li><li>人口由唐初二百万户上升至<span class="blank" onclick="this.classList.add('revealed')">开元时七百万户</span></li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>派宇文融清查户口。逃户免除六年赋役。八十多万隐户重入户籍。人口升至七百万户。</div>`
    }, {
        keyword: "裁汰僧尼",
        hint: "武则天时期佛教膨胀到什么程度？玄宗如何应对？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">背景</span><ul class="kd-list"><li>武则天时僧尼寺院数目大增，寺院占地甚广</li><li>僧尼免除赋役，百姓出家以逃避徭役</li><li>寺院拥有大量田产——<strong>"十分天下之财，而佛有七八"</strong></li></ul></div>
            <div class="kd-block"><span class="kd-label">措施</span><ul class="kd-list"><li>勒令<strong>一万二千多名僧尼还俗</strong></li><li>禁止新建佛寺和铸造佛像</li><li>将寺院多占田地收归国有</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><p class="kd-text">增加国家财政收入，抑制佛教势力膨胀。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>武则天时僧尼大增，"十分天下之财，而佛有七八"。玄宗勒令一万二千多名僧尼还俗，禁止新建佛寺。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">背景</span><ul class="kd-list"><li>武则天时僧尼寺院数目大增</li><li>寺院拥有大量田产——<span class="blank" onclick="this.classList.add('revealed')">"十分天下之财，而佛有七八"</span></li></ul></div>
            <div class="kd-block"><span class="kd-label">措施</span><ul class="kd-list"><li>勒令<span class="blank" onclick="this.classList.add('revealed')">一万二千多名僧尼还俗</span></li><li><span class="blank" onclick="this.classList.add('revealed')">禁止新建佛寺</span>和铸造佛像</li><li>将寺院多占田地收归国有</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><p class="kd-text">增加国家财政收入，抑制佛教势力膨胀。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>"十分天下之财，而佛有七八"。勒令一万二千多名僧尼还俗，禁止新建佛寺。</div>`
    }, {
        keyword: "鼓励农桑",
        hint: "玄宗在农业方面做了哪些事？成效如何？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">措施</span><ul class="kd-list"><li>先后进行<strong>五十余项水利工程</strong></li><li>在西北地区实行<strong>屯田</strong></li><li>继续实行<strong>均田制及租庸调制</strong></li><li>招抚流亡百姓</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><p class="kd-text">开垦田数高达<strong>一千四百余万顷</strong>。社会经济繁荣，民生安乐。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>进行五十余项水利工程，西北屯田。继续均田制及租庸调制。开垦田数高达一千四百余万顷。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">措施</span><ul class="kd-list"><li>先后进行<span class="blank" onclick="this.classList.add('revealed')">五十余项水利工程</span></li><li>在西北地区实行<span class="blank" onclick="this.classList.add('revealed')">屯田</span></li><li>继续实行<span class="blank" onclick="this.classList.add('revealed')">均田制及租庸调制</span></li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><p class="kd-text">开垦田数高达<span class="blank" onclick="this.classList.add('revealed')">一千四百余万顷</span>。社会经济繁荣，民生安乐。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>进行五十余项水利工程。继续均田制及租庸调制。开垦田数高达一千四百余万顷。</div>`
    }, {
        keyword: "改善漕运",
        hint: "裴耀卿和韦坚各提出了什么方案？成效如何？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">背景</span><p class="kd-text">关中粮产有限，难以将关东和江淮粮食运往首都。</p></div>
            <div class="kd-block"><span class="kd-label">措施</span><ul class="kd-list"><li><strong>裴耀卿</strong>——提出<strong>分段运输法</strong></li><li><strong>韦坚</strong>——在渭水南面开凿漕渠</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><ul class="kd-list"><li>物价低廉——<strong>米一斗十三文</strong></li><li>天宝八年仓库总存粮<strong>一亿二千万石</strong></li><li>杜甫《忆昔》："忆昔开元全盛日，小邑犹藏万家室"</li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>裴耀卿提出分段运输法。韦坚开凿漕渠。米一斗十三文。杜甫《忆昔》描写开元盛况。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">背景</span><p class="kd-text">关中粮产有限，难以将关东和江淮粮食运往首都。</p></div>
            <div class="kd-block"><span class="kd-label">措施</span><ul class="kd-list"><li><span class="blank" onclick="this.classList.add('revealed')">裴耀卿</span>——提出<span class="blank" onclick="this.classList.add('revealed')">分段运输法</span></li><li><span class="blank" onclick="this.classList.add('revealed')">韦坚</span>——在渭水南面开凿漕渠</li></ul></div>
            <div class="kd-block"><span class="kd-label">成效</span><ul class="kd-list"><li>物价低廉——<span class="blank" onclick="this.classList.add('revealed')">米一斗十三文</span></li><li>天宝八年仓库总存粮<span class="blank" onclick="this.classList.add('revealed')">一亿二千万石</span></li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>裴耀卿分段运输法。韦坚开凿漕渠。米一斗十三文。杜甫《忆昔》描写盛况。</div>`
    }]
}, {
    id: "culture",
    name: "四、文教方面",
    icon: "📚",
    keywords: [{
        keyword: "搜求遗书与编撰图书",
        hint: "玄宗在文化保存方面做了什么？编了哪些重要典籍？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">搜求遗书</span><ul class="kd-list"><li>特置<strong>集贤院</strong>访求遗书，得<strong>四万八千多卷</strong></li><li>聘请硕学名儒入宫讲学，学术风气大盛</li></ul></div>
            <div class="kd-block"><span class="kd-label">编撰图书</span><ul class="kd-list"><li>命张说修撰五礼，定名<strong>《开元礼》</strong></li><li>编纂<strong>《唐六典》</strong>，为日后行政巨典</li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>特置集贤院访求遗书，得四万八千多卷。命张说修撰《开元礼》，编纂《唐六典》。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">搜求遗书</span><ul class="kd-list"><li>特置<span class="blank" onclick="this.classList.add('revealed')">集贤院</span>访求遗书，得<span class="blank" onclick="this.classList.add('revealed')">四万八千多卷</span></li></ul></div>
            <div class="kd-block"><span class="kd-label">编撰图书</span><ul class="kd-list"><li>命<span class="blank" onclick="this.classList.add('revealed')">张说</span>修撰五礼，定名<span class="blank" onclick="this.classList.add('revealed')">《开元礼》</span></li><li>编纂<span class="blank" onclick="this.classList.add('revealed')">《唐六典》</span></li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>集贤院得四万八千多卷。张说修《开元礼》，编《唐六典》。</div>`
    }, {
        keyword: "鼓励文艺",
        hint: "梨园是什么？唐诗在开元时期有何发展？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">文艺措施</span><ul class="kd-list"><li>选乐工宫女数百人在<strong>梨园</strong>教授乐曲，称「皇帝梨园弟子」</li><li>玄宗亲自制定音律，编演宫廷歌舞</li><li>以<strong>诗赋取士</strong>，唐诗大盛</li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>选乐工宫女在梨园教授乐曲，称「皇帝梨园弟子」。以诗赋取士，唐诗大盛。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">文艺措施</span><ul class="kd-list"><li>选乐工宫女数百人在<span class="blank" onclick="this.classList.add('revealed')">梨园</span>教授乐曲，称<span class="blank" onclick="this.classList.add('revealed')">「皇帝梨园弟子」</span></li><li>以<span class="blank" onclick="this.classList.add('revealed')">诗赋取士</span>，唐诗大盛</li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>梨园教授乐曲。以诗赋取士，唐诗大盛。</div>`
    }]
}, {
    id: "military",
    name: "五、军事方面",
    icon: "⚔️",
    keywords: [{
        keyword: "改革兵制",
        hint: "府兵制出了什么问题？募兵制有什么优势？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">背景</span><p class="kd-text">玄宗时府兵制渐趋败坏。</p></div>
            <div class="kd-block"><span class="kd-label">措施</span><ul class="kd-list"><li>采纳<strong>张说</strong>建议，改行<strong>募兵制</strong></li><li>招募十二万兵员——原称<strong>「长从宿卫」</strong>，后改称<strong>「彍骑」</strong></li></ul></div>
            <div class="kd-block"><span class="kd-label">募兵制优势</span><ul class="kd-list"><li>士兵脱离生产，为职业化军人，训练更充足</li><li>国家统一发放制式装备，承担军队全部开支</li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>采纳张说建议改行募兵制。招募十二万兵员为「长从宿卫」后改「彍骑」。士兵职业化，战力高于府兵。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">背景</span><p class="kd-text">玄宗时<span class="blank" onclick="this.classList.add('revealed')">府兵制渐趋败坏</span>。</p></div>
            <div class="kd-block"><span class="kd-label">措施</span><ul class="kd-list"><li>采纳<span class="blank" onclick="this.classList.add('revealed')">张说</span>建议，改行<span class="blank" onclick="this.classList.add('revealed')">募兵制</span></li><li>招募十二万兵员——原称<span class="blank" onclick="this.classList.add('revealed')">「长从宿卫」</span>，后改称<span class="blank" onclick="this.classList.add('revealed')">「彍骑」</span></li></ul></div>
            <div class="kd-block"><span class="kd-label">募兵制优势</span><ul class="kd-list"><li>士兵脱离生产，为职业化军人</li><li>国家统一发放制式装备</li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>张说建议改募兵制。长从宿卫后改彍骑。士兵职业化战力高于府兵。</div>`
    }, {
        keyword: "设十大兵镇",
        hint: "节度使制度是如何形成的？「出将入相」是什么意思？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">措施</span><ul class="kd-list"><li>公元721年起，在沿边要地设立<strong>十大兵镇</strong></li><li>十镇合共有<strong>四十八万</strong>士兵</li><li>最高长官称<strong>节度使或经略使</strong>，监管军民财政</li></ul></div>
            <div class="kd-block"><span class="kd-label">特点</span><p class="kd-text">节度使多由中央名臣出任，立功后可入朝为相——故称<strong>「出将入相」</strong>。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>在沿边设立十大兵镇，合共四十八万士兵。最高长官称节度使。节度使立功后可入朝为相，称「出将入相」。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">措施</span><ul class="kd-list"><li>公元721年起，在沿边要地设立<span class="blank" onclick="this.classList.add('revealed')">十大兵镇</span></li><li>十镇合共有<span class="blank" onclick="this.classList.add('revealed')">四十八万</span>士兵</li><li>最高长官称<span class="blank" onclick="this.classList.add('revealed')">节度使或经略使</span>，监管军民财政</li></ul></div>
            <div class="kd-block"><span class="kd-label">特点</span><p class="kd-text">节度使立功后可入朝为相——故称<span class="blank" onclick="this.classList.add('revealed')">「出将入相」</span>。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>十大兵镇四十八万士兵。节度使立功入朝为相称「出将入相」。</div>`
    }, {
        keyword: "对外战绩",
        hint: "开元时期对突厥、吐蕃的战绩如何？对外政策总体是什么？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">北平突厥</span><p class="kd-text">突厥南侵，唐将<strong>郭虔瓘</strong>大破突厥，突厥可汗请和。</p></div>
            <div class="kd-block"><span class="kd-label">大破吐蕃</span><p class="kd-text">吐蕃壮大侵扰唐境，玄宗多次派兵征讨得胜，吐蕃求和归附。</p></div>
            <div class="kd-block"><span class="kd-label">睦邻四方</span><ul class="kd-list"><li>保持<strong>天可汗</strong>地位</li><li>与突厥、吐蕃、奚、契丹<strong>和亲</strong></li><li>与西域诸国<strong>互市</strong></li></ul></div>
            <div class="kd-block"><span class="kd-label">总体评价</span><p class="kd-text">对外政策与太宗大致相同——<strong>恩威并施</strong>。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>郭虔瓘大破突厥。多次征讨吐蕃得胜。保持天可汗地位，与边族和亲互市。恩威并施。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">北平突厥</span><p class="kd-text">突厥南侵，唐将<span class="blank" onclick="this.classList.add('revealed')">郭虔瓘</span>大破突厥，突厥可汗请和。</p></div>
            <div class="kd-block"><span class="kd-label">大破吐蕃</span><p class="kd-text">吐蕃壮大侵扰唐境，玄宗多次派兵征讨得胜，吐蕃求和归附。</p></div>
            <div class="kd-block"><span class="kd-label">睦邻四方</span><ul class="kd-list"><li>保持<span class="blank" onclick="this.classList.add('revealed')">天可汗</span>地位</li><li>与边族<span class="blank" onclick="this.classList.add('revealed')">和亲、互市</span></li></ul></div>
            <div class="kd-block"><span class="kd-label">总体评价</span><p class="kd-text">对外政策——<span class="blank" onclick="this.classList.add('revealed')">恩威并施</span>。</p></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>郭虔瓘大破突厥。保持天可汗地位。恩威并施。</div>`
    }]
}, {
    id: "prosperity",
    name: "六、开元之治的盛况",
    icon: "🌟",
    keywords: [{
        keyword: "开元盛世的表现",
        hint: "人口、经济、社会、国际地位各有什么标志性成就？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">1. 人口激增</span><p class="kd-text">开元二十八年，全国户数增至<strong>八百四十余万</strong>，为唐朝户口最高记录。</p></div>
            <div class="kd-block"><span class="kd-label">2. 国家富庶</span><p class="kd-text">各地府库积蓄充盈，长安、洛阳物价低廉，国泰民安。</p></div>
            <div class="kd-block"><span class="kd-label">3. 社会安定</span><ul class="kd-list"><li>废除武则天时期的酷吏和严刑峻法</li><li>开元二十五年，全国死囚仅<strong>五十九人</strong></li></ul></div>
            <div class="kd-block"><span class="kd-label">4. 国际大都会</span><ul class="kd-list"><li>各国使节、商人、僧侣、留学生云集长安</li><li>外国人可在长安当官、经商——如日本人<strong>晁衡</strong></li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>人口增至八百四十余万。开元二十五年死囚仅五十九人。长安成为国际大都会，日本人晁衡在唐为官。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">1. 人口激增</span><p class="kd-text">开元二十八年，全国户数增至<span class="blank" onclick="this.classList.add('revealed')">八百四十余万</span>，为唐朝户口最高记录。</p></div>
            <div class="kd-block"><span class="kd-label">2. 国家富庶</span><p class="kd-text">各地府库积蓄充盈，长安、洛阳物价低廉。</p></div>
            <div class="kd-block"><span class="kd-label">3. 社会安定</span><ul class="kd-list"><li>废除武则天时期的酷吏和严刑峻法</li><li>开元二十五年，全国死囚仅<span class="blank" onclick="this.classList.add('revealed')">五十九人</span></li></ul></div>
            <div class="kd-block"><span class="kd-label">4. 国际大都会</span><ul class="kd-list"><li>各国使节、商人、僧侣、留学生云集长安</li><li>外国人可在长安当官——如日本人<span class="blank" onclick="this.classList.add('revealed')">晁衡</span></li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>人口八百四十余万。死囚仅五十九人。长安为国际大都会，晁衡在唐为官。</div>`
    }]
}, {
    id: "evaluation",
    name: "七、对唐玄宗的评价",
    icon: "⚖️",
    keywords: [
    // 笔记顺序：概述 → 正面(前期) → 负面(后期·一) → 负面(后期·二) → 前期晚期对比
    {
        keyword: "玄宗评价概述",
        hint: "玄宗在位多少年？前后期总体评价是什么？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">概述</span>
            <ul class="kd-list"><li>玄宗在位共<strong>四十四年</strong></li><li><strong>前期</strong>励精图治，勤于政事</li><li><strong>后期</strong>逐渐怠政，昏庸奢欲</li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>玄宗在位共四十四年。前期励精图治，勤于政事。后期逐渐怠政，昏庸奢欲。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">概述</span>
            <ul class="kd-list"><li>玄宗在位共<span class="blank" onclick="this.classList.add('revealed')">四十四年</span></li><li><span class="blank" onclick="this.classList.add('revealed')">前期</span>——励精图治，勤于政事</li><li><span class="blank" onclick="this.classList.add('revealed')">后期</span>——逐渐怠政，昏庸奢欲</li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>在位四十四年。前期励精图治，后期怠政昏庸。</div>`
    }, {
        keyword: "前期励精图治（正面评价）",
        hint: "前期他做了哪些值得肯定的事？成效是什么？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">正面：前期励精图治</span>
            <ul class="kd-list"><li>重用<strong>姚崇、宋璟</strong>等贤臣</li><li>对武韦以来的弊政进行改革：革新科举、重整三省制、提倡节俭、令僧尼还俗</li><li>积极发展经济，提倡文教，对外守土安边</li><li>成效：唐朝国力迈向<strong>顶峰</strong></li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>前期励精图治，重用姚崇、宋璟等贤臣。改革武韦弊政。唐朝国力迈向顶峰。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">正面：前期励精图治</span>
            <ul class="kd-list"><li>重用<span class="blank" onclick="this.classList.add('revealed')">姚崇、宋璟</span>等贤臣</li><li>改革：<span class="blank" onclick="this.classList.add('revealed')">革新科举、重整三省制、提倡节俭、令僧尼还俗</span></li><li>成效：唐朝国力迈向<span class="blank" onclick="this.classList.add('revealed')">顶峰</span></li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>重用姚崇、宋璟。改革武韦弊政。国力迈向顶峰。</div>`
    }, {
        keyword: "后期沉湎声色，疏于政事（负面·一）",
        hint: "后期在施政、用人、生活方面各有什么问题？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">负面：后期沉湎声色，疏于政事</span>
            <ul class="kd-list"><li>改元天宝后，玄宗荒怠朝政，生活奢侈挥霍</li><li><strong>沉湎声色</strong>：宠爱<strong>杨贵妃</strong>；杨氏姐妹受封韩国夫人、虢国夫人、秦国夫人；<strong>杨国忠</strong>为贵妃从兄，权倾朝野</li><li><strong>用人不当</strong>：宠幸宦官<strong>高力士</strong>；重用<strong>李林甫、杨国忠</strong>，阻塞言路；以<strong>安禄山</strong>为三镇节度使</li><li><strong>奢侈迷信</strong>：挥霍奢侈，滥赏滥赐；尊奉佛道，崇信方士</li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>后期沉湎声色，宠爱杨贵妃。杨国忠权倾朝野。宠幸高力士。重用李林甫、杨国忠、安禄山。奢侈挥霍，崇信方士。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">负面：后期沉湎声色，疏于政事</span>
            <ul class="kd-list"><li>宠爱<span class="blank" onclick="this.classList.add('revealed')">杨贵妃</span></li><li>杨氏姐妹受封<span class="blank" onclick="this.classList.add('revealed')">韩国夫人、虢国夫人、秦国夫人</span></li><li><span class="blank" onclick="this.classList.add('revealed')">杨国忠</span>为贵妃从兄，权倾朝野</li><li>宠幸宦官<span class="blank" onclick="this.classList.add('revealed')">高力士</span></li><li>重用<span class="blank" onclick="this.classList.add('revealed')">李林甫、杨国忠</span>，阻塞言路</li><li>以<span class="blank" onclick="this.classList.add('revealed')">安禄山</span>为三镇节度使</li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>宠爱杨贵妃。杨国忠权倾朝野。重用李林甫、安禄山。</div>`
    }, {
        keyword: "后期好大喜功，兵祸连连（负面·二）",
        hint: "晚年对外战争带来了什么后果？杜甫怎么描写的？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">负面：好大喜功，兵祸连连</span>
            <ul class="kd-list"><li>晚年多次征伐<strong>吐蕃、南诏及西域</strong>，军费激增，百姓兵役沉重</li><li>边战频繁，损兵折将，国力下降，民怨渐深</li><li>杜甫《兵车行》："边庭流血成海水，武皇开边意未已"</li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>多次征伐吐蕃、南诏及西域。边战频繁，国力下降。杜甫《兵车行》："边庭流血成海水，武皇开边意未已"。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">负面：好大喜功，兵祸连连</span>
            <ul class="kd-list"><li>晚年多次征伐<span class="blank" onclick="this.classList.add('revealed')">吐蕃、南诏及西域</span></li><li>边战频繁，损兵折将，国力下降</li><li>杜甫<span class="blank" onclick="this.classList.add('revealed')">《兵车行》</span>："边庭流血成海水，武皇开边意未已"</li></ul></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>征伐吐蕃、南诏、西域。杜甫《兵车行》描写边战之惨。</div>`
    }, {
        keyword: "前期与晚期对比",
        hint: "施政态度、用人、吏治、财政、对外各有什么变化？",
        answerHTML_full: `
            <div class="kd-block"><span class="kd-label">前期 vs 晚期</span>
            <table class="kd-table"><tr><th></th><th>前期</th><th>晚期</th></tr>
            <tr><td>施政态度</td><td>励精图治，勤于政事</td><td>疏于政事，沉迷享乐</td></tr>
            <tr><td>用人</td><td>姚崇、宋璟、韩休、张九龄；广开言路</td><td>高力士、李林甫、杨国忠、安禄山；阻塞言路</td></tr>
            <tr><td>吏治</td><td>整饬吏治，政治清明</td><td>营私舞弊，败坏朝政</td></tr>
            <tr><td>财政</td><td>崇尚节俭，禁教节用</td><td>奢侈挥霍，滥赏滥赐</td></tr>
            <tr><td>对外</td><td>恩威并施，睦邻四方</td><td>穷兵黩武，征战连连</td></tr></table></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>前期励精图治用贤臣，后期疏于政事用权臣。前期节俭恩威并施，后期奢侈穷兵黩武。</div>`,
        answerHTML_fill: `
            <div class="kd-block"><span class="kd-label">前期 vs 晚期</span>
            <table class="kd-table"><tr><th></th><th>前期</th><th>晚期</th></tr>
            <tr><td>施政态度</td><td><span class="blank" onclick="this.classList.add('revealed')">励精图治，勤于政事</span></td><td>疏于政事，沉迷享乐</td></tr>
            <tr><td>用人</td><td><span class="blank" onclick="this.classList.add('revealed')">姚崇、宋璟、张九龄</span></td><td><span class="blank" onclick="this.classList.add('revealed')">李林甫、杨国忠、安禄山</span></td></tr>
            <tr><td>吏治</td><td>整饬吏治，政治清明</td><td><span class="blank" onclick="this.classList.add('revealed')">营私舞弊，败坏朝政</span></td></tr>
            <tr><td>财政</td><td><span class="blank" onclick="this.classList.add('revealed')">崇尚节俭</span></td><td>奢侈挥霍，滥赏滥赐</td></tr>
            <tr><td>对外</td><td><span class="blank" onclick="this.classList.add('revealed')">恩威并施，睦邻四方</span></td><td>穷兵黩武，征战连连</td></tr></table></div>
            <div class="kd-note"><span class="note-label">📝 笔记原文</span>前期励精图治用贤臣，后期疏于政事用权臣。前期节俭恩威并施，后期奢侈穷兵黩武。</div>`
    }]
}];

// ==================== 状态管理 ====================
let currentCategory = null;
let currentKeywordIndex = 0;
let keywordQueue = [];
let currentMode = 'fill'; // 'fill' | 'full'
let evalRecord = {};
try { evalRecord = JSON.parse(localStorage.getItem('tangEvalRecord') || '{}'); } catch (e) { evalRecord = {}; }
function saveRecord() { try { localStorage.setItem('tangEvalRecord', JSON.stringify(evalRecord)); } catch (e) {} }
function getRecordKey(catId, kwIdx) { return catId + '_' + kwIdx; }

// ==================== 主页 ====================
function renderHome() {
    const grid = document.getElementById('category-grid');
    grid.innerHTML = '';
    categories.forEach(cat => {
        let mastered = 0, partial = 0;
        cat.keywords.forEach((kw, i) => {
            const k = getRecordKey(cat.id, i);
            if (evalRecord[k] === 'full') mastered++;
            if (evalRecord[k] === 'partial') partial++;
        });
        const total = cat.keywords.length;
        const unlearned = total - mastered - partial;
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = function() { startCategory(cat.id); };
        card.innerHTML = `
            <div>
                <div class="cat-name">${cat.icon} ${cat.name}</div>
                <div class="cat-stats">${total}个关键词 | 已掌握:${mastered} | 部分:${partial} | 未学:${unlearned}</div>
                <div class="mastery-dots">
                    ${cat.keywords.map((kw,i)=>{
                        const k=getRecordKey(cat.id,i);
                        if(evalRecord[k]==='full') return '<div class="dot filled"></div>';
                        if(evalRecord[k]==='partial') return '<div class="dot partial"></div>';
                        return '<div class="dot"></div>';
                    }).join('')}
                </div>
            </div>
            <div class="cat-badge">${unlearned > 0 ? '开始练习 →' : '✅ 全部掌握'}</div>`;
        grid.appendChild(card);
    });
}

function startCategory(catId) {
    currentCategory = categories.find(c => c.id === catId);
    if (!currentCategory || currentCategory.keywords.length === 0) { alert('该领域无关键词数据'); return; }
    const forgotPartial = [], unlearned = [], mastered = [];
    currentCategory.keywords.forEach((kw, i) => {
        const k = getRecordKey(catId, i);
        if (evalRecord[k] === 'forgot' || evalRecord[k] === 'partial') forgotPartial.push(i);
        else if (evalRecord[k] === 'full') mastered.push(i);
        else unlearned.push(i);
    });
    shuffle(forgotPartial); shuffle(unlearned); shuffle(mastered);
    keywordQueue = [...forgotPartial, ...unlearned, ...mastered];
    if (keywordQueue.length === 0) { alert('🎉 该领域所有关键词已全部掌握！'); return; }
    currentKeywordIndex = 0;
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
    showKeyword();
}

function startRandom() { startCategory(categories[Math.floor(Math.random() * categories.length)].id); }
function startWeakest() {
    let weakest = null, lowestRate = 1;
    categories.forEach(cat => {
        let mastered = 0;
        cat.keywords.forEach((kw, i) => { if (evalRecord[getRecordKey(cat.id, i)] === 'full') mastered++; });
        const rate = cat.keywords.length > 0 ? mastered / cat.keywords.length : 0;
        if (rate < lowestRate) { lowestRate = rate; weakest = cat; }
    });
    if (weakest && lowestRate < 1) startCategory(weakest.id); else startRandom();
}
function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } }

// ==================== 游戏页 ====================
function showKeyword() {
    if (currentKeywordIndex >= keywordQueue.length) { alert('🎉 本轮练习结束！'); goHome(); return; }
    const kwIdx = keywordQueue[currentKeywordIndex];
    const kw = currentCategory.keywords[kwIdx];
    document.getElementById('kw-label').textContent = currentCategory.icon + ' ' + currentCategory.name;
    document.getElementById('kw-keyword').textContent = kw.keyword;
    document.getElementById('kw-hint').textContent = '💡 提示：' + kw.hint;
    document.getElementById('answer-area').style.display = 'none';
    document.getElementById('self-eval').style.display = 'none';
    document.getElementById('reveal-btn').style.display = 'inline-block';
    document.getElementById('game-progress').innerHTML = '进度：<span>' + (currentKeywordIndex + 1) + '</span> / ' + keywordQueue.length;
    currentMode = 'fill';
    document.getElementById('mode-fill').classList.add('active');
    document.getElementById('mode-full').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function revealAnswer() {
    const kwIdx = keywordQueue[currentKeywordIndex];
    const kw = currentCategory.keywords[kwIdx];
    document.getElementById('reveal-btn').style.display = 'none';
    document.getElementById('answer-title').textContent = '📜 ' + kw.keyword;
    renderAnswerHTML();
    document.getElementById('answer-area').style.display = 'block';
    document.getElementById('self-eval').style.display = 'block';
    document.getElementById('answer-area').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function switchMode(mode) {
    currentMode = mode;
    document.getElementById('mode-fill').classList.toggle('active', mode === 'fill');
    document.getElementById('mode-full').classList.toggle('active', mode === 'full');
    renderAnswerHTML();
}

function renderAnswerHTML() {
    const kwIdx = keywordQueue[currentKeywordIndex];
    const kw = currentCategory.keywords[kwIdx];
    const key = currentMode === 'fill' ? 'answerHTML_fill' : 'answerHTML_full';
    document.getElementById('answer-body').innerHTML = kw[key] || kw['answerHTML_full'];
}

function selfEval(level) {
    const kwIdx = keywordQueue[currentKeywordIndex];
    evalRecord[getRecordKey(currentCategory.id, kwIdx)] = level;
    saveRecord();
    currentKeywordIndex++;
    showKeyword();
}

function goHome() {
    currentCategory = null; currentKeywordIndex = 0; keywordQueue = [];
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('game-page').style.display = 'none';
    renderHome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== 统计弹窗 ====================
function showStats() {
    const overlay = document.getElementById('stats-overlay');
    const box = document.getElementById('stats-box');
    let totalK = 0, totalF = 0, totalP = 0;
    let html = '<h3>📊 掌握统计</h3>';
    categories.forEach(cat => {
        let m = 0, p = 0;
        cat.keywords.forEach((kw, i) => {
            totalK++;
            if (evalRecord[getRecordKey(cat.id, i)] === 'full') { m++; totalF++; }
            if (evalRecord[getRecordKey(cat.id, i)] === 'partial') { p++; totalP++; }
        });
        const rate = cat.keywords.length > 0 ? Math.round(m / cat.keywords.length * 100) : 0;
        html += `<div class="stat-row"><span class="stat-name">${cat.icon} ${cat.name}</span><span class="stat-val">${rate}% (${m}/${cat.keywords.length})</span></div>`;
    });
    const totalRate = totalK > 0 ? Math.round(totalF / totalK * 100) : 0;
    html += `<div class="stat-row" style="font-weight:bold;border-top:2px solid #a0522d;margin-top:8px;padding-top:12px;"><span>📝 总掌握率</span><span>${totalRate}% (${totalF}/${totalK})</span></div>`;
    html += `<div class="stat-row"><span>⚠ 部分记得</span><span>${totalP}</span></div>`;
    html += '<button onclick="closeStats()">关闭</button>';
    box.innerHTML = html;
    overlay.classList.add('show');
}
function closeStats() { document.getElementById('stats-overlay').classList.remove('show'); }
document.getElementById('stats-overlay').addEventListener('click', function(e) { if (e.target === this) closeStats(); });

// ==================== 初始化 ====================
renderHome();
</script>
</body>
</html>
